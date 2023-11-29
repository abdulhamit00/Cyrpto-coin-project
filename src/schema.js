import * as yup from "yup";

// doğrulama şeması oluşturma:
export const schema = yup.object().shape({
  //email için zorunlulukları belirleme
  email: yup
    .string()
    .email("Lütfen geçerli bir mail giriniz")
    .required("Zorunlu alan"),

  age: yup
    .number()
    .min(18, "18 yaşıdan küçükler giremez")
    .max(100, "yaşınız 100 den büyük olamaz")
    .integer("yaşınız bir tam sayı olmalı"),
  password: yup
    .string()
    .min(5, "Şifre en az 5 karakter olmalı")
    .matches(/[a-z]/, "Şifreniz en az bir tane küçük harf içermelidir.")
    .matches(/[A-Z]/, "Şifreniz en az bir tane büyük harf içermelidir.")
    .matches(
      /[@$!%*?&#]/,
      "Şifreniz en az bir tane özel karakter içermelidir."
    ),
  confirm_password: yup
    .string()
    //oneOf : elemanın değeri verilen değerlerden biriyle eşleşiyor mu ?
    //ref : farklı bir inputtan veri çağırmaya yarar
    .oneOf([yup.ref("password"), null], "Şifreler uyuşmuyor")
    .required("Zorunlu alan"),
});
