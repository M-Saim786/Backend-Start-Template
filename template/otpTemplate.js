export const otpTemplate = (otp) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify Your Health Vault Account</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      padding: 20px;
      color: #1e293b;
    }
    .container {
      max-width: 480px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
      border: 1px solid #e2e8f0;
    }
    .header {
      background: linear-gradient(135deg, #3b82f6, #2563eb);
      padding: 32px 24px;
      text-align: center;
      color: white;
    }
    .logo {
      width: 56px;
      height: 56px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
      backdrop-filter: blur(10px);
    }
    .logo svg {
      width: 32px;
      height: 32px;
    }
    .title {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .subtitle {
      font-size: 15px;
      opacity: 0.9;
      font-weight: 500;
    }
    .content {
      padding: 32px 28px;
      text-align: center;
    }
    .otp-box {
      background: #f8fafc;
      border: 2px dashed #cbd5e1;
      border-radius: 12px;
      padding: 24px;
      margin: 24px 0;
      font-size: 36px;
      font-weight: 700;
      letter-spacing: 4px;
      color: #1e40af;
      font-family: 'Courier New', monospace;
    }
    .message {
      font-size: 15px;
      line-height: 1.6;
      color: #475569;
      margin-bottom: 20px;
    }
    .highlight {
      color: #3b82f6;
      font-weight: 600;
    }
    .warning {
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 14px;
      color: #92400e;
      margin: 20px 0;
      text-align: left;
    }
    .footer {
      background: #f8fafc;
      padding: 24px;
      text-align: center;
      font-size: 13px;
      color: #94a3b8;
      border-top: 1px solid #e2e8f0;
    }
    .footer a {
      color: #3b82f6;
      text-decoration: none;
    }
    @media (max-width: 480px) {
      .container { margin: 20px auto; }
      .header, .content { padding: 24px 20px; }
      .otp-box { font-size: 28px; letter-spacing: 2px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <div class="logo">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
          <path d="M2 17l10 5 10-5"></path>
          <path d="M2 12l10 5 10-5"></path>
        </svg>
      </div>
      <div class="title">Health Vault</div>
      <div class="subtitle">Secure Medical Records</div>
    </div>

    <!-- Content -->
    <div class="content">
      <h2 style="font-size: 20px; margin-bottom: 16px; color: #1e293b;">
        Verify Your Account
      </h2>
      <p class="message">
        You're almost there! Please use the <span class="highlight">6-digit code</span> below to complete your registration.
      </p>

      <div class="otp-box">${otp}</div>

      <p class="message">
        This code will expire in <strong>10 minutes</strong> for security.
      </p>

      <div class="warning">
        <strong>Do not share this code</strong> with anyone. Health Vault will never ask for your OTP via call or message.
      </div>

      <p class="message">
        If you didn’t request this, you can safely ignore this email.
      </p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} <strong>Health Vault</strong>. All rights reserved.</p>
      <p>
        Need help? <a href="mailto:support@healthvault.com">Contact Support</a>
      </p>
      <p style="margin-top: 12px; font-size: 11px;">
        Sent with care from Health Vault • Protecting your health data
      </p>
    </div>
  </div>
</body>
</html>
`;