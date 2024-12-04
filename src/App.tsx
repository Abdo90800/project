import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Bell, Mail, User } from 'lucide-react';
import { userSchema, type UserFormData } from './types/form';
import { FormField } from './components/FormField';

function App() {
  const methods = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: ''
      },
      address: {
        street: '',
        city: '',
        country: '',
        postalCode: ''
      },
      account: {
        username: '',
        password: '',
        confirmPassword: ''
      },
      preferences: {
        newsletter: false,
        notifications: []
      }
    },
    mode: 'onBlur'
  });

  const { 
    register, 
    handleSubmit, 
    formState: { errors, touchedFields }
  } = methods;

  const onSubmit = (data: UserFormData) => {
    console.log('بيانات النموذج:', data);
  };

  // تحويل كائن touchedFields إلى قيم boolean
  const isTouched = {
    personalInfo: {
      firstName: !!touchedFields.personalInfo?.firstName,
      lastName: !!touchedFields.personalInfo?.lastName,
      email: !!touchedFields.personalInfo?.email,
      phoneNumber: !!touchedFields.personalInfo?.phoneNumber
    },
    address: {
      street: !!touchedFields.address?.street,
      city: !!touchedFields.address?.city,
      country: !!touchedFields.address?.country,
      postalCode: !!touchedFields.address?.postalCode
    },
    account: {
      username: !!touchedFields.account?.username,
      password: !!touchedFields.account?.password,
      confirmPassword: !!touchedFields.account?.confirmPassword
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
        <div className="mb-8 text-center">
          <User className="mx-auto h-12 w-12 text-indigo-600" />
          <h2 className="mt-4 text-3xl font-bold text-gray-900">نموذج التسجيل المتقدم</h2>
          <p className="mt-2 text-gray-600">يرجى ملء جميع المعلومات المطلوبة</p>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
            {/* المعلومات الشخصية */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">المعلومات الشخصية</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField 
                  label="الاسم الأول" 
                  error={errors.personalInfo?.firstName}
                  touched={isTouched.personalInfo.firstName}
                  required
                >
                  <input
                    {...register('personalInfo.firstName')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </FormField>

                <FormField 
                  label="الاسم الأخير" 
                  error={errors.personalInfo?.lastName}
                  touched={isTouched.personalInfo.lastName}
                  required
                >
                  <input
                    {...register('personalInfo.lastName')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </FormField>

                <FormField 
                  label="البريد الإلكتروني" 
                  error={errors.personalInfo?.email}
                  touched={isTouched.personalInfo.email}
                  required
                >
                  <input
                    type="email"
                    {...register('personalInfo.email')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </FormField>

                <FormField 
                  label="رقم الهاتف" 
                  error={errors.personalInfo?.phoneNumber}
                  touched={isTouched.personalInfo.phoneNumber}
                  required
                >
                  <input
                    {...register('personalInfo.phoneNumber')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </FormField>
              </div>
            </div>

            {/* العنوان */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">العنوان</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField 
                  label="الشارع" 
                  error={errors.address?.street}
                  touched={isTouched.address.street}
                  required
                >
                  <input
                    {...register('address.street')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </FormField>

                <FormField 
                  label="المدينة" 
                  error={errors.address?.city}
                  touched={isTouched.address.city}
                  required
                >
                  <input
                    {...register('address.city')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </FormField>

                <FormField 
                  label="الدولة" 
                  error={errors.address?.country}
                  touched={isTouched.address.country}
                  required
                >
                  <input
                    {...register('address.country')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </FormField>

                <FormField 
                  label="الرمز البريدي" 
                  error={errors.address?.postalCode}
                  touched={isTouched.address.postalCode}
                  required
                >
                  <input
                    {...register('address.postalCode')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </FormField>
              </div>
            </div>

            {/* معلومات الحساب */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">معلومات الحساب</h3>
              <div className="grid grid-cols-1 gap-4">
                <FormField 
                  label="اسم المستخدم" 
                  error={errors.account?.username}
                  touched={isTouched.account.username}
                  required
                >
                  <input
                    {...register('account.username')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </FormField>

                <FormField 
                  label="كلمة المرور" 
                  error={errors.account?.password}
                  touched={isTouched.account.password}
                  required
                >
                  <input
                    type="password"
                    {...register('account.password')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </FormField>

                <FormField 
                  label="تأكيد كلمة المرور" 
                  error={errors.account?.confirmPassword}
                  touched={isTouched.account.confirmPassword}
                  required
                >
                  <input
                    type="password"
                    {...register('account.confirmPassword')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </FormField>
              </div>
            </div>

            {/* التفضيلات */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">التفضيلات</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    {...register('preferences.newsletter')}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label className="mr-2 block text-sm text-gray-700">
                    الاشتراك في النشرة الإخبارية
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    أنواع الإشعارات
                  </label>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        value="email"
                        {...register('preferences.notifications')}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <Mail className="mr-2 h-5 w-5 text-gray-400" />
                      <span className="mr-2 text-sm text-gray-700">إشعارات البريد الإلكتروني</span>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        value="push"
                        {...register('preferences.notifications')}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <Bell className="mr-2 h-5 w-5 text-gray-400" />
                      <span className="mr-2 text-sm text-gray-700">إشعارات الموقع</span>
                    </div>
                  </div>
                  {errors.preferences?.notifications && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.preferences.notifications.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                إرسال النموذج
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default App;