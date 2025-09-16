import Mailgen from "mailgen";

export const MailConfig={
    service:'gmail',
    auth:{
        user:process.env.MAIL!,
        pass:process.env.MAIL_PASS!,
    }
}
export const mailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'RI PlanIt',
      link: 'http://localhost:4200',
      logo: "https://res.cloudinary.com/dftvthudb/image/upload/v1744654813/icon-text_jztpvu.png", 
      copyright: '© 2025 RI PlanIt. All rights reserved.'
    }
  });