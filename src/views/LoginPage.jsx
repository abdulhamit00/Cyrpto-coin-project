import { useFormik } from "formik";
import { schema } from "../schema";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

const LoginPage = () => {
  const navigate = useNavigate();
  //useFormik > Formik özelliklerini kullanmamızı sağlayan hook
  const formik = useFormik({
    // formda tutulacak verilerin ilk değerleri
    initialValues: { email: "", age: "", password: "", confirm_password: "" },
    //formun gönderilme olayında çalışır
    onSubmit: async (values, actions) => {
      //api simülasyonu
      await new Promise((resolve) => setTimeout(resolve, 1900));

      //kullanıcıyı lokale gönder
      localStorage.setItem("user", JSON.stringify({ ...values, id: v4() }));

      //anasayfaya yönlendir
      navigate("/home");

      //formu temizler
      actions.resetForm();
    },

    //doğrulama şeması
    validationSchema: schema,
  });
  return (
    <div>
      <div className="container">
        <div className="logo">
          <img src="/c-logo.png" alt="coin-logo" />
          <h2>Coinmania</h2>
        </div>
        {/* form alanı */}
        <form onSubmit={formik.handleSubmit}>
          {inputs.map((data, key) => (
            <InputField formik={formik} key={key} data={data} />
          ))}

          <button disabled={formik.isSubmitting} type="submit">
            Kaydol
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

//inputlar için dizi
const inputs = [
  {
    label: "Email",
    name: "email",
    type: "email",
  },
  {
    label: "Yaş",
    name: "age",
    type: "number",
  },
  {
    label: "Şifre",
    name: "password",
    type: "password",
  },
  {
    label: "Şifre Onay",
    name: "confirm_password",
    type: "password",
  },
];

//input alanı bileşeni

const InputField = ({ formik, data }) => {
  const { label, name, type } = data;
  return (
    <div>
      <label>{label}</label>
      <input
        value={formik.values[name]}
        onChange={formik.handleChange}
        name={name}
        onBlur={formik.handleBlur}
        type={type}
      />
      {formik.touched[name] && formik.errors[name] && (
        <span>{formik.errors[name]}</span>
      )}
    </div>
  );
};
