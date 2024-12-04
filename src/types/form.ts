import { z } from 'zod';

// مخطط التحقق من صحة البيانات باستخدام Zod
export const userSchema = z.object({
  personalInfo: z.object({
    firstName: z.string()
      .min(2, 'الاسم الأول يجب أن يكون على الأقل حرفين')
      .max(50, 'الاسم الأول لا يجب أن يتجاوز 50 حرفاً'),
    lastName: z.string()
      .min(2, 'الاسم الأخير يجب أن يكون على الأقل حرفين')
      .max(50, 'الاسم الأخير لا يجب أن يتجاوز 50 حرفاً'),
    email: z.string()
      .email('البريد الإلكتروني غير صالح'),
    phoneNumber: z.string()
      .regex(/^[0-9+\-\s()]{8,}$/, 'رقم الهاتف غير صالح')
  }),
  address: z.object({
    street: z.string().min(5, 'العنوان يجب أن يكون على الأقل 5 أحرف'),
    city: z.string().min(2, 'اسم المدينة مطلوب'),
    country: z.string().min(2, 'اسم الدولة مطلوب'),
    postalCode: z.string().regex(/^[0-9]{5}$/, 'الرمز البريدي يجب أن يكون 5 أرقام')
  }),
  account: z.object({
    username: z.string()
      .min(3, 'اسم المستخدم يجب أن يكون على الأقل 3 أحرف')
      .max(30, 'اسم المستخدم لا يجب أن يتجاوز 30 حرفاً'),
    password: z.string()
      .min(8, 'كلمة المرور يجب أن تكون على الأقل 8 أحرف')
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/, 
        'كلمة المرور يجب أن تحتوي على حرف كبير، حرف صغير، رقم، ورمز خاص'),
    confirmPassword: z.string()
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'كلمات المرور غير متطابقة',
    path: ['confirmPassword']
  }),
  preferences: z.object({
    newsletter: z.boolean(),
    notifications: z.array(z.string()).min(1, 'اختر على الأقل نوع إشعار واحد')
  })
});

export type UserFormData = z.infer<typeof userSchema>;