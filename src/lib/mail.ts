import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const url =
    process.env.NODE_ENV === "production"
      ? "https://idylle.vercel.app"
      : "http://localhost:3000";

  const confirmLink = `${url}/auth/verify-email?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Vérification de votre adresse email",
    html: `
    <p>Bonjour,</p>
    </br>
    <p>Veuillez cliquer sur le lien suivant pour confirmer votre adresse email :</p>
    </br>
    <a href="${confirmLink}">Lien de confirmation</a>
    </br>
    <p>Cordialement,</p>
    <p>L'équipe Idylle</p>
    `,
  });
};
