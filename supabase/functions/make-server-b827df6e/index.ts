/**
 * Supabase Edge Function: Project Management API
 * Handles CRUD operations for carbon removal projects
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
};

interface Project {
  id?: string;
  user_id: string;
  name: string;
  type: string;
  location: string;
  status: string;
  estimated_credits?: number;
  created_at?: string;
  updated_at?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { 
      headers: corsHeaders,
      status: 200
    });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    // Verify the user
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    const url = new URL(req.url);
    const path = url.pathname;

    // Route: GET /projects - Get all projects for user
    if (req.method === 'GET' && path.endsWith('/projects')) {
      const { data: projects, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return new Response(
        JSON.stringify({ projects: projects || [] }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    // Route: POST /projects - Create new project
    if (req.method === 'POST' && path.endsWith('/projects')) {
      const body = await req.json();
      
      const projectData: Project = {
        user_id: user.id,
        name: body.name,
        type: body.type,
        location: body.location,
        status: body.status || 'planning',
        estimated_credits: body.estimated_credits || 0,
      };

      const { data: project, error } = await supabase
        .from('projects')
        .insert([projectData])
        .select()
        .single();

      if (error) throw error;

      return new Response(
        JSON.stringify({ project }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 201,
        }
      );
    }

    // Route: GET /projects/:id - Get specific project
    if (req.method === 'GET' && path.match(/\/projects\/[^\/]+$/)) {
      const projectId = path.split('/').pop();
      
      const { data: project, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .eq('user_id', user.id)
        .single();

      if (error) throw error;

      return new Response(
        JSON.stringify({ project }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    // Route: PUT /projects/:id - Update project
    if (req.method === 'PUT' && path.match(/\/projects\/[^\/]+$/)) {
      const projectId = path.split('/').pop();
      const body = await req.json();
      
      const { data: project, error } = await supabase
        .from('projects')
        .update(body)
        .eq('id', projectId)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      return new Response(
        JSON.stringify({ project }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    // Route: DELETE /projects/:id - Delete project
    if (req.method === 'DELETE' && path.match(/\/projects\/[^\/]+$/)) {
      const projectId = path.split('/').pop();
      
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId)
        .eq('user_id', user.id);

      if (error) throw error;

      return new Response(
        JSON.stringify({ success: true }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    // 404 - Route not found
    return new Response(
      JSON.stringify({ error: 'Route not found' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 404,
      }
    );

  } catch (error) {
    console.error('Function error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Internal server error'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: error instanceof Error && error.message === 'Unauthorized' ? 401 : 500,
      }
    );
  }
});

