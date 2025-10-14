/**
 * Onboarding V2 Data Persistence Layer
 * Client-side helpers for role-based onboarding
 */

import { supabase } from './supabaseClient';

export type UserRole = 'PROJECT_DEVELOPER' | 'TECHNOLOGY_DEVELOPER' | 'CREDIT_BUYER' | 'PARTNER';
export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'DONE' | 'BLOCKED';

export interface UserProfile {
  user_id: string;
  full_name?: string;
  role?: UserRole;
  org_name?: string;
  created_at?: string;
  updated_at?: string;
}

export interface TaskTemplate {
  id: number;
  role: UserRole;
  title: string;
  description?: string;
  required: boolean;
  sort_order: number;
}

export interface UserTask {
  id: number;
  user_id: string;
  template_id?: number;
  title: string;
  description?: string;
  status: TaskStatus;
  due_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface OnboardingAnswer {
  id?: number;
  user_id: string;
  role: UserRole;
  question_key: string;
  answer: any; // JSONB - flexible
  created_at?: string;
}

/**
 * Save or update user's role in their profile (Multi-Role System)
 * Inserts into user_roles table and updates basic profile info
 */
export async function saveUserRole(userId: string, role: UserRole, fullName?: string, orgName?: string) {
  try {
    if (!supabase) {
      console.warn('Supabase not configured');
      return { success: false, error: 'Supabase not configured' };
    }

    // 1. Insert role into user_roles table
    const { data: roleData, error: roleError } = await supabase
      .from('user_roles')
      .insert({
        user_id: userId,
        role,
        questionnaire_completed: false,
        added_at: new Date().toISOString()
      })
      .select()
      .single();

    if (roleError) {
      console.error('Error saving user role:', roleError);
      return { success: false, error: roleError.message };
    }

    // 2. Update profile with basic info (if provided)
    if (fullName || orgName) {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          org_name: orgName,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId);

      if (profileError) {
        console.warn('Could not update profile info:', profileError);
        // Don't fail the whole operation if profile update fails
      }
    }

    console.log('✅ User role saved:', roleData);
    return { success: true, data: roleData };
  } catch (error) {
    console.error('Failed to save user role:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Mark a role's questionnaire as completed
 */
export async function markQuestionnaireComplete(userId: string, role: UserRole) {
  try {
    if (!supabase) {
      console.warn('Supabase not configured');
      return { success: false, error: 'Supabase not configured' };
    }

    const { data, error } = await supabase
      .from('user_roles')
      .update({
        questionnaire_completed: true,
        completed_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .eq('role', role)
      .select()
      .single();

    if (error) {
      console.error('Error marking questionnaire complete:', error);
      return { success: false, error: error.message };
    }

    console.log('✅ Questionnaire marked complete:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Failed to mark questionnaire complete:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get user's profile
 */
export async function getUserProfile(userId: string) {
  try {
    if (!supabase) {
      return { success: false, data: null, error: 'Supabase not configured' };
    }

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error getting user profile:', error);
      return { success: false, data: null, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Failed to get user profile:', error);
    return { success: false, data: null, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Generate tasks for a user based on their role (idempotent)
 * Only creates tasks that don't already exist
 */
export async function generateTasksForRole(userId: string, role: UserRole) {
  try {
    if (!supabase) {
      return { success: false, error: 'Supabase not configured' };
    }

    // Get templates for this role
    const { data: templates, error: templatesError } = await supabase
      .from('task_templates')
      .select('*')
      .eq('role', role)
      .order('sort_order');

    if (templatesError) {
      console.error('Error fetching templates:', templatesError);
      return { success: false, error: templatesError.message };
    }

    if (!templates || templates.length === 0) {
      console.warn('No templates found for role:', role);
      return { success: false, error: 'No templates found for this role' };
    }

    // Check which tasks already exist
    const { data: existingTasks } = await supabase
      .from('user_tasks')
      .select('template_id')
      .eq('user_id', userId);

    const existingTemplateIds = new Set(
      existingTasks?.map(t => t.template_id).filter(Boolean) || []
    );

    // Create tasks from templates (only new ones)
    const tasksToCreate = templates
      .filter(template => !existingTemplateIds.has(template.id))
      .map(template => ({
        user_id: userId,
        template_id: template.id,
        title: template.title,
        description: template.description,
        status: 'PENDING' as TaskStatus,
        due_date: null
      }));

    if (tasksToCreate.length === 0) {
      console.log('✅ All tasks already exist for this role');
      return { success: true, data: [] };
    }

    const { data: newTasks, error: tasksError } = await supabase
      .from('user_tasks')
      .insert(tasksToCreate)
      .select();

    if (tasksError) {
      console.error('Error creating tasks:', tasksError);
      return { success: false, error: tasksError.message };
    }

    console.log(`✅ Created ${newTasks?.length || 0} tasks for role: ${role}`);
    return { success: true, data: newTasks };
  } catch (error) {
    console.error('Failed to generate tasks:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get all tasks for a user
 */
export async function getUserTasks(userId: string) {
  try {
    if (!supabase) {
      return { success: false, data: [], error: 'Supabase not configured' };
    }

    const { data, error } = await supabase
      .from('user_tasks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching tasks:', error);
      return { success: false, data: [], error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Failed to get user tasks:', error);
    return { success: false, data: [], error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Update task status
 */
export async function updateTaskStatus(taskId: number, status: TaskStatus) {
  try {
    if (!supabase) {
      return { success: false, error: 'Supabase not configured' };
    }

    const { data, error } = await supabase
      .from('user_tasks')
      .update({ status })
      .eq('id', taskId)
      .select()
      .single();

    if (error) {
      console.error('Error updating task status:', error);
      return { success: false, error: error.message };
    }

    console.log('✅ Task status updated:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Failed to update task status:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Save onboarding answers
 */
export async function saveOnboardingAnswers(
  userId: string,
  role: UserRole,
  answers: Record<string, any>
) {
  try {
    if (!supabase) {
      return { success: false, error: 'Supabase not configured' };
    }

    // Convert answers object to array of answer records
    const answerRecords = Object.entries(answers).map(([question_key, answer]) => ({
      user_id: userId,
      role,
      question_key,
      answer: answer // Will be stored as JSONB
    }));

    // Upsert all answers (update if exists, insert if not)
    const { data, error } = await supabase
      .from('onboarding_answers')
      .upsert(answerRecords, {
        onConflict: 'user_id,role,question_key'
      })
      .select();

    if (error) {
      console.error('Error saving answers:', error);
      return { success: false, error: error.message };
    }

    console.log(`✅ Saved ${answerRecords.length} onboarding answers`);
    return { success: true, data };
  } catch (error) {
    console.error('Failed to save onboarding answers:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get onboarding answers for a user
 */
export async function getOnboardingAnswers(userId: string, role?: UserRole) {
  try {
    if (!supabase) {
      return { success: false, data: [], error: 'Supabase not configured' };
    }

    let query = supabase
      .from('onboarding_answers')
      .select('*')
      .eq('user_id', userId);

    if (role) {
      query = query.eq('role', role);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching answers:', error);
      return { success: false, data: [], error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Failed to get onboarding answers:', error);
    return { success: false, data: [], error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Get dashboard data for a user (profile + tasks)
 */
export async function getDashboardNextSteps(userId: string) {
  try {
    const [profileResult, tasksResult] = await Promise.all([
      getUserProfile(userId),
      getUserTasks(userId)
    ]);

    return {
      success: profileResult.success && tasksResult.success,
      profile: profileResult.data,
      tasks: tasksResult.data,
      error: profileResult.error || tasksResult.error
    };
  } catch (error) {
    console.error('Failed to get dashboard data:', error);
    return {
      success: false,
      profile: null,
      tasks: [],
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Get onboarding progress statistics
 */
export async function getOnboardingProgress(userId: string) {
  try {
    const result = await getUserTasks(userId);
    
    if (!result.success || !result.data) {
      return {
        success: false,
        totalTasks: 0,
        completedTasks: 0,
        inProgressTasks: 0,
        pendingTasks: 0,
        percentComplete: 0
      };
    }

    const tasks = result.data;
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'DONE').length;
    const inProgressTasks = tasks.filter(t => t.status === 'IN_PROGRESS').length;
    const pendingTasks = tasks.filter(t => t.status === 'PENDING').length;
    const percentComplete = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return {
      success: true,
      totalTasks,
      completedTasks,
      inProgressTasks,
      pendingTasks,
      percentComplete
    };
  } catch (error) {
    console.error('Failed to get onboarding progress:', error);
    return {
      success: false,
      totalTasks: 0,
      completedTasks: 0,
      inProgressTasks: 0,
      pendingTasks: 0,
      percentComplete: 0
    };
  }
}

