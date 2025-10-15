# 🔧 Fix Image Upload - Dashboard Method (No SQL Required)

## The Problem
Getting `ERROR: 42501: must be owner of table objects` when running SQL scripts.

This happens because the SQL Editor doesn't have permissions to modify `storage.objects` directly.

## ✅ Solution: Use Supabase Dashboard (Recommended)

### Step 1: Go to Storage Settings

1. Open your **Supabase Dashboard**
2. Click **Storage** in the left sidebar
3. Find the **`profile-images`** bucket (or create it if missing)

### Step 2: Create the Bucket (If It Doesn't Exist)

If you don't see `profile-images`:

1. Click **New bucket**
2. Enter these settings:
   - **Name:** `profile-images`
   - **Public bucket:** ✅ **YES** (check this!)
   - **File size limit:** `5 MB`
   - **Allowed MIME types:** `image/jpeg, image/jpg, image/png, image/gif, image/webp`
3. Click **Create bucket**

### Step 3: Update Bucket Settings (If It Exists)

If the bucket already exists:

1. Click on **`profile-images`** bucket
2. Click the **Settings** icon (gear) or **⋮** menu
3. Click **Edit bucket**
4. Make sure these are set:
   - **Public bucket:** ✅ **YES** (must be checked!)
   - **File size limit:** `5 MB`
5. Click **Save**

### Step 4: Set Up Policies via Dashboard

1. Still in the **`profile-images`** bucket
2. Click the **Policies** tab
3. Click **New Policy**

#### Policy 1: Upload (INSERT)
```
Name: Authenticated users can upload profile images
Policy command: INSERT
Target roles: authenticated
USING expression: (leave blank)
WITH CHECK expression: bucket_id = 'profile-images'
```
Click **Create policy**

#### Policy 2: Update (UPDATE)
```
Name: Authenticated users can update profile images
Policy command: UPDATE
Target roles: authenticated
USING expression: bucket_id = 'profile-images'
WITH CHECK expression: bucket_id = 'profile-images'
```
Click **Create policy**

#### Policy 3: Delete (DELETE)
```
Name: Authenticated users can delete profile images
Policy command: DELETE
Target roles: authenticated
USING expression: bucket_id = 'profile-images'
WITH CHECK expression: (leave blank)
```
Click **Create policy**

#### Policy 4: Read (SELECT)
```
Name: Public can view profile images
Policy command: SELECT
Target roles: public
USING expression: bucket_id = 'profile-images'
WITH CHECK expression: (leave blank)
```
Click **Create policy**

### Step 5: Test Upload

1. Go back to your application
2. Refresh the page
3. Try uploading a profile image
4. Should work now! ✅

---

## 🚀 Alternative: SQL with Elevated Permissions

If you have access to run SQL with elevated permissions, try this script:

**File:** `supabase/FIX_IMAGE_UPLOAD_PERMISSIONS.sql`

It uses `SET ROLE supabase_storage_admin` to get the necessary permissions.

**Note:** If you get permission errors with this too, use the Dashboard method above instead.

---

## 🔍 Verify It's Working

### Check Bucket Exists
```sql
SELECT * FROM storage.buckets WHERE id = 'profile-images';
```

Should show:
- `public`: `true`
- `file_size_limit`: `5242880`
- `allowed_mime_types`: Array of image types

### Check Policies
```sql
SELECT 
  policyname,
  cmd,
  roles::text
FROM pg_policies
WHERE tablename = 'objects'
  AND schemaname = 'storage'
  AND policyname ILIKE '%profile%';
```

Should show 4 policies (INSERT, UPDATE, DELETE, SELECT)

### Test in Console
Open browser console while uploading:
```javascript
// Should NOT see "RLS policy violation" errors
// Should see successful upload response
```

---

## 🎯 Why This Works

The Dashboard UI:
- Has elevated permissions automatically
- Creates policies correctly
- Doesn't require SQL admin access
- Is the official Supabase-recommended method

The SQL approach requires:
- Database owner role
- Storage admin permissions
- Which most users don't have in SQL Editor

---

## 🆘 Still Having Issues?

### Issue: Bucket is not public
**Fix:** Go to Storage > profile-images > Settings > Make sure "Public bucket" is checked

### Issue: Wrong MIME types
**Fix:** Edit bucket > Add: `image/jpeg, image/jpg, image/png, image/gif, image/webp`

### Issue: File too large
**Fix:** Edit bucket > Set file size limit to `5242880` (5 MB in bytes)

### Issue: No policies showing
**Fix:** Make sure you're looking at the `profile-images` bucket, not another bucket

---

## 📋 Quick Checklist

Before trying to upload again, verify:

- [ ] `profile-images` bucket exists
- [ ] Bucket is marked as **PUBLIC** ✅
- [ ] File size limit is at least **5 MB**
- [ ] Allowed MIME types include image formats
- [ ] **4 policies** are created (INSERT, UPDATE, DELETE, SELECT)
- [ ] INSERT/UPDATE/DELETE policies target `authenticated` role
- [ ] SELECT policy targets `public` role
- [ ] Your application code uses correct bucket name: `'profile-images'`
- [ ] User is signed in (authenticated)

---

## ✅ Success Indicators

You'll know it's fixed when:
- No SQL permission errors
- No RLS violation errors in browser console
- Images appear in Storage dashboard after upload
- Profile pictures display in your app
- Can update/change images without errors

---

**Bottom line:** Use the Dashboard UI method - it's easier and doesn't require special SQL permissions! 🎉

