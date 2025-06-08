// test with mailjet but it doesn't work because website's domain is not verified


import Mailjet from "node-mailjet";

const mailjet = new Mailjet({
  apiKey: process.env.MAILJET_PUBLIC_API_KEY,
  apiSecret: process.env.MAILJET_PRIVATE_API_KEY,
});

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  const url =
    process.env.NODE_ENV === "production"
      ? "https://idylle.vercel.app"
      : "http://localhost:3000";

  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "noreply@ydille.vercel.app",
          Name: "Ydille Team",
        },
        To: [
          {
            Email: email,
            Name: "You",
          },
        ],
        Subject: "Code de vérification",
        HTMLPart: `
            <p>Bonjour,</p>
            </br>
            <p>Votre code de verification est : ${token}</p>
            </br>
            <p>Cordialement,</p>
            <p>L'équipe Idylle</p>
        `,
      },
    ],
  });
  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err.statusCode);
    });
};

// export const sendVerificationEmail = async (email: string, token: string) => {
//   const url =
//     process.env.NODE_ENV === "production"
//       ? "https://idylle.vercel.app"
//       : "http://localhost:3000";

//   const confirmLink = `${url}/auth/new-verification?token=${token}`;

//   await resend.emails.send({
//     from: "onboarding@resend.dev",
//     to: email,
//     subject: "Vérification de votre adresse email",
//     html: `
//     <p>Bonjour,</p>
//     </br>
//     <p>Veuillez cliquer sur le lien suivant pour confirmer votre adresse email :</p>
//     </br>
//     <a href="${confirmLink}">Lien de confirmation</a>
//     </br>
//     <p>Cordialement,</p>
//     <p>L'équipe Idylle</p>
//     `,
//   });
// };

// export const sendResetPasswordEmail = async (email: string, token: string) => {
//   const url =
//     process.env.NODE_ENV === "production"
//       ? "https://idylle.vercel.app"
//       : "http://localhost:3000";

//   const resetLink = `${url}/auth/new-password?token=${token}`;

//   await resend.emails.send({
//     from: "onboarding@resend.dev",
//     to: email,
//     subject: "Réinitialisation du mot de passe",
//     html: `
//     <p>Bonjour,</p>
//     </br>
//     <p>Veuillez cliquer sur le lien suivant pour réinitialiser votre mot de passe :</p>
//     </br>
//     <a href="${resetLink}">Lien de reinitialisation</a>
//     </br>
//     <p>Cordialement,</p>
//     <p>L'équipe Idylle</p>
//     `,
//   });
// };
