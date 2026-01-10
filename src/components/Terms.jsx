import React from "react";

const Terms = () => {
  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Terms & Privacy Policy
        </h1>

        <div className="space-y-6 text-gray-700 dark:text-gray-300 text-sm leading-7">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Terms of Service</h2>
            <p>
              By using AssetVerse, you agree to comply with our terms and
              conditions. This platform is intended for educational and business
              use only.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">2. User Responsibility</h2>
            <p>
              Users are responsible for maintaining the confidentiality of their
              account information and activities.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. Privacy Policy</h2>
            <p>
              We respect your privacy. Any personal information collected (such
              as email) is used only to improve our services and will never be
              shared with third parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. Data Protection</h2>
            <p>
              We implement reasonable security measures to protect user data,
              but we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. Changes</h2>
            <p>
              AssetVerse reserves the right to update these terms at any time
              without prior notice.
            </p>
          </section>
        </div>
      </div>
    </section>
  );
};

export default Terms;
