# ✅ Fix Image Upload - Dashboard Method (Works Every Time!)

## 🚨 If You're Getting Permission Errors in SQL Editor

**STOP using SQL scripts!** The Supabase Dashboard UI method works without any permission issues.

### Errors You Might See:
- ❌ `ERROR: 42501: must be owner of table objects`
- ❌ `ERROR: 42501: permission denied to set role "supabase_storage_admin"`
- ❌ `Failed to upload image. new row violates row-level security policy`

### ✅ Solution: Use Dashboard (5 minutes, no SQL required!)

---

## 📋 Step-by-Step Instructions

### STEP 1: Open Storage in Dashboard

1. Go to **https://supabase.com/dashboard**
2. Select your project: **"Mālama Carbon Homepage"**
3. Click **Storage** in the left sidebar (looks like a folder icon)

### STEP 2: Find or Create the Bucket

#### If `profile-images` bucket EXISTS:
1. Click on the **`profile-images`** bucket name
2. Skip to **STEP 3**

#### If `profile-images` bucket DOES NOT EXIST:
1. Click **"New bucket"** button (top right)
2. Fill in the form:
   ```
   Name: profile-images
   
   ☑️ Public bucket (CHECK THIS BOX!)
   
   File size limit: 5 MB
   
   Allowed MIME types (click "Add MIME type" for each):
   - image/jpeg
   - image/jpg
   - image/png
   - image/gif
   - image/webp
   ```
3. Click **"Create bucket"**
4. Now click on the **`profile-images`** bucket to open it

### STEP 3: Verify Bucket is Public

1. Inside the `profile-images` bucket, look for **Settings** or **⋮** (three dots menu)
2. Click **"Edit bucket"** or **"Settings"**
3. **CRITICAL:** Make sure **"Public bucket"** is ✅ **CHECKED**
4. If it wasn't checked, check it now and click **"Save"**

### STEP 4: Set Up Policies

1. Inside the `profile-images` bucket, click the **"Policies"** tab
2. You should see a list of policies (might be empty)

#### Delete Old Policies (If Any Exist)
If you see ANY old policies with confusing names, delete them:
- Click the **⋮** menu next to each policy
- Click **"Delete"**
- Confirm deletion

#### Create Policy #1: Upload (INSERT)
1. Click **"New Policy"** button
2. Click **"For full customization"** (or "Create a new policy from scratch")
3. Fill in:
   ```
   Policy name: Authenticated users can upload profile images
   
   Policy command: INSERT (select from dropdown)
   
   Target roles: authenticated (type and select)
   
   USING expression: (leave blank)
   
   WITH CHECK expression: bucket_id = 'profile-images'
   ```
4. Click **"Review"** then **"Save policy"**

#### Create Policy #2: Update (UPDATE)
1. Click **"New Policy"** button again
2. Click **"For full customization"**
3. Fill in:
   ```
   Policy name: Authenticated users can update profile images
   
   Policy command: UPDATE (select from dropdown)
   
   Target roles: authenticated
   
   USING expression: bucket_id = 'profile-images'
   
   WITH CHECK expression: bucket_id = 'profile-images'
   ```
4. Click **"Review"** then **"Save policy"**

#### Create Policy #3: Delete (DELETE)
1. Click **"New Policy"** button again
2. Click **"For full customization"**
3. Fill in:
   ```
   Policy name: Authenticated users can delete profile images
   
   Policy command: DELETE (select from dropdown)
   
   Target roles: authenticated
   
   USING expression: bucket_id = 'profile-images'
   
   WITH CHECK expression: (leave blank)
   ```
4. Click **"Review"** then **"Save policy"**

#### Create Policy #4: Read (SELECT)
1. Click **"New Policy"** button again
2. Click **"For full customization"**
3. Fill in:
   ```
   Policy name: Public can view profile images
   
   Policy command: SELECT (select from dropdown)
   
   Target roles: public (type "public")
   
   USING expression: bucket_id = 'profile-images'
   
   WITH CHECK expression: (leave blank)
   ```
4. Click **"Review"** then **"Save policy"**

### STEP 5: Verify Policies Are Created

Back in the **Policies** tab, you should now see **4 policies**:

✅ Authenticated users can upload profile images (INSERT)  
✅ Authenticated users can update profile images (UPDATE)  
✅ Authenticated users can delete profile images (DELETE)  
✅ Public can view profile images (SELECT)

### STEP 6: Test Upload

1. Go back to your application
2. **Refresh the page** (Ctrl+R or Cmd+R)
3. Make sure you're **signed in**
4. Try uploading a profile image
5. ✅ **Should work now!**

---

## 🎯 What You Should See

### In Supabase Dashboard:

**Storage > profile-images:**
```
Bucket Details:
  Name: profile-images
  Public: ✅ Yes
  File size limit: 5 MB
  
Policies (4):
  ✅ Authenticated users can upload profile images
  ✅ Authenticated users can update profile images  
  ✅ Authenticated users can delete profile images
  ✅ Public can view profile images
```

### In Your Application:

**After uploading:**
- No error messages in console
- Image appears immediately
- Can see it in Storage > profile-images folder
- Image displays on profile page

---

## 🔍 Troubleshooting

### Still Getting "RLS Policy Violation"?

**Check these:**
1. Is the bucket **public**? (Storage > profile-images > Settings)
2. Are all **4 policies** created? (Storage > profile-images > Policies)
3. Are you **signed in** to your app?
4. Did you **refresh** the page after creating policies?

### "Cannot Read Property of Null" Error?

This means the user isn't authenticated. Check:
```javascript
// In browser console
const { data: { user } } = await supabase.auth.getUser();
console.log('User:', user); // Should show user object, not null
```

### File Too Large?

Check bucket settings:
- Storage > profile-images > Settings
- File size limit should be **5242880** bytes (5 MB)
- Or set higher if needed

### Wrong File Type?

Check allowed MIME types:
- Storage > profile-images > Settings  
- Should include: `image/jpeg`, `image/jpg`, `image/png`, `image/gif`, `image/webp`

---

## 📊 Quick Verification Queries

If you want to verify via SQL (read-only queries work fine):

### Check Bucket Exists
```sql
SELECT id, name, public, file_size_limit 
FROM storage.buckets 
WHERE id = 'profile-images';
```

Expected result:
| id | name | public | file_size_limit |
|----|------|--------|-----------------|
| profile-images | profile-images | true | 5242880 |

### Check Policies Exist
```sql
SELECT policyname, cmd
FROM pg_policies
WHERE tablename = 'objects'
  AND schemaname = 'storage'
  AND policyname ILIKE '%profile%'
ORDER BY cmd;
```

Expected result: 4 rows (DELETE, INSERT, SELECT, UPDATE)

---

## ✅ Success Checklist

Before considering it "fixed", verify:

- [ ] `profile-images` bucket exists in Dashboard
- [ ] Bucket is marked **PUBLIC** (very important!)
- [ ] File size limit is **5 MB** or higher
- [ ] Allowed MIME types include image formats
- [ ] **4 policies** are visible in Policies tab
- [ ] Policy #1: INSERT for authenticated users
- [ ] Policy #2: UPDATE for authenticated users  
- [ ] Policy #3: DELETE for authenticated users
- [ ] Policy #4: SELECT for public users
- [ ] You are signed in to the app
- [ ] Page has been refreshed
- [ ] Upload works without errors!

---

## 🎉 Why This Works

**The Dashboard UI:**
- Has built-in elevated permissions
- Bypasses SQL role restrictions
- Is the official Supabase-recommended method
- Creates policies with correct ownership
- Doesn't require `supabase_storage_admin` role

**The SQL Editor:**
- ❌ Limited permissions by design
- ❌ Cannot modify storage policies directly
- ❌ Cannot set elevated roles
- ✅ But works fine for regular queries

---

## 💡 Pro Tips

1. **Always use Dashboard** for storage configuration
2. **Use SQL Editor** for data queries and custom migrations
3. **Keep bucket public** if you want users to view images
4. **Test in incognito** to verify public access works
5. **Check browser console** for specific error messages

---

## 🆘 Still Stuck?

If it's still not working after following ALL steps above:

1. **Double-check bucket is public** (most common issue!)
2. **Sign out and sign back in** to your app
3. **Clear browser cache** (Ctrl+Shift+Delete)
4. **Try in incognito/private window**
5. **Check browser console** for specific errors
6. **Verify you created all 4 policies** (not 3, not 2 - must be 4!)

---

## 📝 Summary

**What we fixed:**
- Created `profile-images` storage bucket
- Made it public so users can view images
- Added 4 RLS policies for upload/update/delete/view
- All done via Dashboard UI (no SQL permission issues!)

**Result:**
- ✅ Users can upload profile images
- ✅ Images are publicly viewable
- ✅ No RLS violation errors
- ✅ No SQL permission errors

**Time required:** ~5 minutes  
**Difficulty:** Easy  
**SQL knowledge needed:** None!

---

Good luck! 🚀 Your image uploads should work perfectly now.

