# 🗺️ Complete Website Interaction Map

## Overview
This document maps **every user interaction** on malamalabs.com and shows what data is captured.

---

## 🏠 Homepage Interactions

### Hero Section
| Interaction | Data Captured | Table | Status |
|------------|---------------|-------|--------|
| Click "Get Started as a Project Developer" | Button label, location, page, destination, session | `cta_clicks` | 🟢 Ready |
| Click "For Carbon Credit Buyers" | Button label, location, page, destination, session | `cta_clicks` | 🟢 Ready |
| Click "Schedule a Demo" | Button label, location, page, destination, session | `cta_clicks` | 🟢 Ready |

### Features Section
| Interaction | Data Captured | Table | Status |
|------------|---------------|-------|--------|
| View page | Page name, path, referrer, screen size, session | `page_views` | 🟢 Ready |

### Project Gallery
| Interaction | Data Captured | Table | Status |
|------------|---------------|-------|--------|
| Click "Learn More" (disabled) | N/A - Button disabled | N/A | ✅ Complete |
| Click "COMING SOON" | N/A - Button disabled | N/A | ✅ Complete |

### Footer CTAs
| Interaction | Data Captured | Table | Status |
|------------|---------------|-------|--------|
| Click footer nav links | Button label, location, page, destination, session | `cta_clicks` | 🟢 Ready |
| Submit newsletter | Email, consent, session | Custom (future) | 🟡 Planned |

---

## 📱 Contact Page

### Contact Form
| Interaction | Data Captured | Table | Status |
|------------|---------------|-------|--------|
| Submit form | Name, email, company, inquiry type, message, user_agent, referrer | `contact_submissions` | ✅ Active |
| Abandon form | Form type, step, completed fields, session | `form_abandonments` | 🟢 Ready |
| Form error | Error type, message, page, session | `error_logs` | 🟢 Ready |

### Contact Cards
| Interaction | Data Captured | Table | Status |
|------------|---------------|-------|--------|
| Click email/phone links | Button label, location, page, destination | `cta_clicks` | 🟢 Ready |
| Select inquiry type | Field selection tracked in form data | `contact_submissions` | ✅ Active |

---

## 🚀 Get Started Flow

### User Type Selection
| Interaction | Data Captured | Table | Status |
|------------|---------------|-------|--------|
| Select "Project Developer" | User type selection | `onboarding_submissions` | 🟢 Ready |
| Select "Carbon Credit Buyer" | User type selection | `onboarding_submissions` | 🟢 Ready |
| Select "Land Steward" | User type selection | `onboarding_submissions` | 🟢 Ready |
| Select "Industry Partner" | User type selection | `onboarding_submissions` | 🟢 Ready |

### Multi-Step Form (All User Types)
| Interaction | Data Captured | Table | Status |
|------------|---------------|-------|--------|
| Complete Step 1 | All form fields for that step | `onboarding_submissions` | 🟢 Ready |
| Complete Step 2 | All form fields for that step | `onboarding_submissions` | 🟢 Ready |
| Complete Step 3 | All form fields for that step | `onboarding_submissions` | 🟢 Ready |
| Complete Step 4 (Account) | Email, password, full name, terms acceptance | Supabase Auth | ✅ Active |
| Abandon form | Form type, step number, completed fields | `form_abandonments` | 🟢 Ready |
| Form validation error | Error type, message, field | `error_logs` | 🟢 Ready |

### Account Creation
| Interaction | Data Captured | Table | Status |
|------------|---------------|-------|--------|
| Sign up | Email, password (hashed), name | `auth.users` | ✅ Active |
| Email verification | Verification status | `auth.users` | ✅ Active |
| Resend verification | Email address | `auth.users` | ✅ Active |

---

## 💼 Dashboard (Authenticated Users)

### Profile Management
| Interaction | Data Captured | Table | Status |
|------------|---------------|-------|--------|
| View profile | User ID, session | `page_views` | 🟢 Ready |
| Edit profile | Full name, company, industry, phone, address, website | `user_profiles` | 🟢 Ready |
| Upload profile image | Image file → converted to base64/URL | `user_profiles` | 🟢 Ready |
| Add profile type | New profile type added to array | `user_profiles` | 🟢 Ready |

### Project Management
| Interaction | Data Captured | Table | Status |
|------------|---------------|-------|--------|
| Create project | Name, location, type, description, user_id | `projects` | ✅ Active (local fallback) |
| View projects | User ID, project list | `projects` | ✅ Active (local fallback) |
| Update project | Project ID, updated fields | `projects` | 🟢 Ready |
| Delete project (future) | Project ID | `projects` | 🟡 Planned |

### Project Metrics
| Interaction | Data Captured | Table | Status |
|------------|---------------|-------|--------|
| Update carbon sequestered | Project ID, new value | `projects` | 🟢 Ready |
| Update sensors deployed | Project ID, new value | `projects` | 🟢 Ready |
| Update biochars produced | Project ID, new value | `projects` | 🟢 Ready |
| Update credits issued | Project ID, new value | `projects` | 🟢 Ready |
| Update progress | Project ID, percentage | `projects` | 🟢 Ready |

---

## 🎓 Advisory Board

### Application Form
| Interaction | Data Captured | Table | Status |
|------------|---------------|-------|--------|
| Submit Step 1 (Personal) | Name, email, phone, location, LinkedIn | `advisory_applications` | 🟢 Ready |
| Submit Step 2 (Background) | Title, company, experience, expertise | `advisory_applications` | 🟢 Ready |
| Submit Step 3 (Expertise) | Primary expertise, how can help, achievements | `advisory_applications` | 🟢 Ready |
| Submit Step 4 (Network) | Investor/corporate/developer intros, network description | `advisory_applications` | 🟢 Ready |
| Submit Step 5 (Details) | Time commitment, equity expectations, start date | `advisory_applications` | 🟢 Ready |
| Abandon form | Form type, step, completed fields | `form_abandonments` | 🟢 Ready |

---

## 📽️ Presentations Hub

### Presentation Cards
| Interaction | Data Captured | Table | Status |
|------------|---------------|-------|--------|
| Click "SAFE Round Deck" | Deck key, referral code, user_id, user_agent | `presentation_clicks` | ✅ Active |
| Click "CO₂.0 for Buyers" | Deck key, referral code, user_id, user_agent | `presentation_clicks` | ✅ Active |
| Click "CO₂.0 for Projects" | Deck key, referral code, user_id, user_agent | `presentation_clicks` | ✅ Active |

### Secondary CTAs
| Interaction | Data Captured | Table | Status |
|------------|---------------|-------|--------|
| Click "Book a meeting" | Button label, location, destination | `cta_clicks` | 🟢 Ready |
| Click "Investor Portal" | Button label, location, destination | `cta_clicks` | 🟢 Ready |

---

## 📊 Presentations (All 3 Decks)

### Slide Navigation
| Interaction | Data Captured | Table | Status |
|------------|---------------|-------|--------|
| View slide | Deck key, slide number, slide title, session_id | `slide_views` | 🟢 Ready |
| Time on slide | Deck key, slide number, seconds spent | `slide_views` | 🟢 Ready |
| Next/Previous | Triggers new slide view | `slide_views` | 🟢 Ready |
| Jump to slide | Triggers new slide view with slide number | `slide_views` | 🟢 Ready |

### Presentation Controls
| Interaction | Data Captured | Table | Status |
|------------|---------------|-------|--------|
| Close presentation | Session end time (calculated) | `slide_views` | 🟢 Ready |
| Fullscreen toggle | Session metadata | `slide_views` | 🟢 Ready |

---

## 🔐 Investor Portal

### Authentication
| Interaction | Data Captured | Table | Status |
|------------|---------------|-------|--------|
| Enter access code | Code validation attempt | Custom (future) | 🟡 Planned |
| View portal | User session, page view | `page_views` | 🟢 Ready |

### Tab Navigation
| Interaction | Data Captured | Table | Status |
|------------|---------------|-------|--------|
| Click "Overview" tab | Tab change, user session | `cta_clicks` | 🟢 Ready |
| Click "Round Info" tab | Tab change, user session | `cta_clicks` | 🟢 Ready |
| Click "Financials" tab | Tab change, user session | `cta_clicks` | 🟢 Ready |
| Click "Data Room" tab | Tab change, user session | `cta_clicks` | 🟢 Ready |
| Click "Team" tab | Tab change, user session | `cta_clicks` | 🟢 Ready |

### Document Downloads
| Interaction | Data Captured | Table | Status |
|------------|---------------|-------|--------|
| Click document download | Document name, user, timestamp | Custom (future) | 🟡 Planned |

---

## 🔧 Platform Pages

### How It Works
| Interaction | Data Captured | Table | Status |
|------------|---------------|-------|--------|
| View page | Page name, path, session | `page_views` | 🟢 Ready |
| Click "Learn More" buttons | Button label, location, destination | `cta_clicks` | 🟢 Ready |

### About Page
| Interaction | Data Captured | Table | Status |
|------------|---------------|-------|--------|
| View page | Page name, path, session | `page_views` | 🟢 Ready |
| Watch embedded video | Video play/pause (future) | Custom (future) | 🟡 Planned |

### Team Page
| Interaction | Data Captured | Table | Status |
|------------|---------------|-------|--------|
| View page | Page name, path, session | `page_views` | 🟢 Ready |
| Click team member links | Button label, destination | `cta_clicks` | 🟢 Ready |

---

## 🌐 Global Interactions

### Navigation
| Interaction | Data Captured | Table | Status |
|------------|---------------|-------|--------|
| Any page change | Page name, path, referrer, screen size | `page_views` | 🟢 Ready |
| Click logo | Button label, destination | `cta_clicks` | 🟢 Ready |
| Click nav links | Button label, destination | `cta_clicks` | 🟢 Ready |

### Referral Tracking
| Interaction | Data Captured | Table | Status |
|------------|---------------|-------|--------|
| Visit with ?ref=CODE | Referral code stored in localStorage | All tables | ✅ Active |
| All subsequent actions | Referral code attached to all events | All tables | ✅ Active |

### Error Tracking
| Interaction | Data Captured | Table | Status |
|------------|---------------|-------|--------|
| JavaScript error | Error type, message, stack, page, user | `error_logs` | 🟢 Ready |
| Unhandled promise rejection | Error message, page, user | `error_logs` | 🟢 Ready |
| API error | Endpoint, status code, error message | `error_logs` | 🟢 Ready |

### Session Tracking
| Interaction | Data Captured | Table | Status |
|------------|---------------|-------|--------|
| First visit | Session ID generated and stored | All tables | ✅ Active |
| All interactions | Session ID attached to anonymous users | All tables | ✅ Active |
| Sign up | Session linked to user ID | All tables | ✅ Active |

---

## 📈 Analytics Summary

### Total Tracking Points: **50+**

### Data Tables: **10**
1. ✅ `contact_submissions` - Active
2. 🟢 `presentation_clicks` - Ready
3. 🟢 `slide_views` - Ready
4. 🟢 `page_views` - Ready
5. 🟢 `cta_clicks` - Ready
6. 🟢 `onboarding_submissions` - Ready
7. 🟢 `advisory_applications` - Ready
8. 🟢 `projects` - Ready (local fallback active)
9. 🟢 `user_profiles` - Ready
10. 🟢 `form_abandonments` - Ready
11. 🟢 `error_logs` - Ready

### Status Legend
- ✅ **Active** - Currently tracking in production
- 🟢 **Ready** - Code deployed, database table created, ready to use
- 🟡 **Planned** - Future enhancement

---

## 🎯 Conversion Funnels Tracked

### 1. Project Developer Funnel
```
Homepage → Get Started → Type Selection → Step 1-4 → Account Created → Dashboard → Create Project
     ↓         ↓              ↓              ↓            ↓            ↓           ↓
page_views  cta_clicks   onboarding   onboarding    auth.users   user_profiles  projects
                         _submissions  _submissions
```

### 2. Presentation Engagement Funnel
```
Presentations Hub → Click Deck → View Slides → Time on Slide → Complete/Exit
        ↓               ↓            ↓              ↓              ↓
   page_views   presentation   slide_views    slide_views    slide_views
                  _clicks
```

### 3. Contact Form Funnel
```
Homepage → Contact Page → Fill Form → Submit → Success
    ↓           ↓             ↓          ↓         ↓
page_views  page_views   form_       contact    contact
                         abandonments submissions submissions
```

### 4. Advisory Board Funnel
```
Homepage → Advisory Page → Start Application → Complete Steps → Submit
    ↓            ↓               ↓                  ↓            ↓
page_views   page_views    form_abandonments   form_       advisory_
                                             abandonments applications
```

---

## 🔐 Privacy & Security

### Data Protection
- ✅ Row Level Security (RLS) on all tables
- ✅ User data scoped to authenticated user only
- ✅ Admin access requires special role
- ✅ Passwords hashed by Supabase Auth
- ✅ Session IDs for anonymous tracking
- ✅ GDPR-compliant cascading deletes

### Data Retention
- Contact submissions: Indefinite
- Analytics events: 90 days (recommended)
- Error logs: 30 days (recommended)
- User data: Until account deletion

---

**Last Updated**: 2025-10-14  
**Version**: 1.0.0  
**Coverage**: 100% of user interactions mapped

