import "./Login.css";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";

function Login() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const dispatch = useDispatch();
  const auth = getAuth();

  const loginToApp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      dispatch(
        login({
          email: user.email,
          uid: user.uid,
          displayName: name,
          photoUrl: profilePic,
        })
      );
    } catch (error) {
      alert(error);
    }
  };
  const register = async () => {
    if (!name) {
      return alert("Please enter a full name!");
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      console.log(user);
      dispatch(
        login({
          email: user.email,
          uid: user.uid,
          displayName: name,
          photoUrl: profilePic,
        })
      );
      updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: profilePic,
      });
    } catch (error) {
      alert(error);
    }

    console.log(email, name, password, profilePic);
  };

  return (
    <div className="login">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAaYAAAB3CAMAAAB/uhQPAAAAulBMVEX///8AZpkAAAAKbJwuLi4AZJjc6/IVZJfIyMgAZ5kgICD09PTExMReXl7w8PAAXpRycnJ+fn7Q0NALCwu5ubkWFhYAWJDZ2dk7ha1mocCVlZXy+ftERETk7vSvr68iIiKpyNm/1eJpaWk6OjqioqLL3eji4uJRUVE1NTUjeaY/Pz+mpqZqamqGhoZ6enpgYGCPj49MTEyWvdNNkLMsgqyEr8mfwdVKj7QGdKNupMGJtc5amrxOiq+oyNkgPOGiAAAMIElEQVR4nO2daXuqPhPGXcBHRcGilp6K4opbra1d/qfHc77/13oEUcjMgMhm6ZX7lRcmmORnFmYmoVDgiqDebPe2LKes5dtu1rt1TfOs0b52r4jFdCWKilLbz25d19yqtyunzuiESvm9u3V1c6reh5gRJBuUyDlF0i6rruRwUjinCBqVM6V04LTk89P1elOypVQsKl98vXetZllOTEeJZd6drtWf+6wpHboTn52u1UPmY94B0/7Wtc6b+rXMxzxrEXHraudNlf/dAlP51tXOm26CqcgxXSmOKRfimHIhjikX4phyIY4pF+KYciGOKRfimHIhjikXCsYkWkoLk6mxMsOW2cooJ1F5CZRAk5K4azTB1mAr6I9JVBSxvFwua0ryTngb0/NK92qyCdVI2mNrruuvzU0nfpuqr0wJ9NdG7FtGlTwGrfHIVM8Xk3i//BhVDpp9/qck7eywMW1LrFoheoj00j6nb2px26ZaZ0vQ7sS9Y2TJOmiNu1CYxPKH6wkfLRPuUA6mtldhMJnN0jnT4VM1ZttUDaYIN8bEtkYoTOJy5E3V/5tsf4qISW6VvHlKi9DTGa3viylcbxJrQ/YulWWinCIOeh2Qo/Qcr20aOR/0sBd8d5/ksBcNkzSHmFbxpqecYxIVFPrTLyaOqXktJrMNcpTq8do175h+40C6RENbomFSIaVSaR2rbXKOSXnH9/lKMlAsMUzTWG3zAzF93B6Thii1B7HaJu+YiACtRGOYo2GSJhDTRI3VNjnHJCoVeJteovF80TAVHiGmbTyDUc4xFe//wNsME7VDRMSkrUCWmDa4vGMSl6A79f5L/vH2ekyFAZvjJWbb5B1TUQR7W/4ka9SLiqnQMdz03ce4bZN7TEVl33cT9b8S9jpFxlRQn1fHh9xJK77XIf+YDqu9z4rdo3qV4UPSHqfomA4T1OBxs3lZqwm48H4ApqIiLr8+h8PPrwcx8b01cTAdJCXkZf0JmKx1ueVjT8F5GxdTUvoZmIqWuTWViJafhEmSTVNTVVXTTDlkLz9ksXOYbo5YmNJSPjBJKhZwRMrqYLPVhXq33a4bk+bdunqxEpLW2WxXhpVD0McvjeMdM8QkimEjkTLEJMmy77/8Aqb1YgK0WDBGRPVluwCVEJqPgT4wadB6Zfwx9fnGsnhFjYUA8vvCva7cK8VauVw7TGYXZ7OomCQg+rKbvPr4pC8EYbHabjqEQz4YU1UoIW0832vjOk5wkHHn7/uv6shndiD1IkXFVGNUrPl8cbquKL/f/gxn/V6vMvr89X4paCwiJtUA4RNHP8a6zcYRLI4GWfOOvf+8A38gEJOJfMWHtvNAapGMjlrT3Vcb+6RfqdGc7O+VfsWr/t72Y4jlIbi+sy/X9iPGalHZPQSOflExwb/i0Q4xBVcFK+JIfsSdoQli+4IwSXcou7fpBshaz9aF6lABefROJEwP0H37675WpA7eGNYOS/a//5C3t78LChqLiqkLsvhj0mCkha3uhvmNIEwDnNstoLTxbXBHRBAhLCajFRxAE8Z0mKy+kNvD0mzv/1ScLKYB6GQHTCYxr9iae38kAJNJtPw5qxw04DmawHEPeWGCFQtTcQSuD2v3ficQ9b58o5ESxgQuC6oGE3q+9FTfH5P0ijLOzxlNWHJSOludKykljUn58m/WL7/+lC6mxWAcUP+xW39fTNILyvZ6nm3C9CVLTEx8x/+PQytZTJ/7gNO8er985qd0MRnUqvesthvm4oupg5bar647n5qX2tQ62zPTafD56qKSxTQj56Xztw+3wHRBbgCFHyYTeolLEzdcvYpu2BqomtaYogW8Zx4cX1VCS8liuqBPell+U0zuaOSHCc09gksJImy7a+8G7DJnk0WDLEdXWCwE+hE5Y0w+ewRui6l+algfTGjl3PYEMIFZq+sN6IRPxIJTI5l4Ui7pLx1Tlk112iSLnymmwuc3xFQ6eedpTFV4u67HkAejZtiwWw08pDq9k1g/tKfnByt5QE1c2WLq/abunw0mfTueG9QXgnM/EhNebntRgHX1Eygh6Ihj+yJh0KgzEQIa8ZSXCqbZ8N+/UZ/6hnzIzQDTZGrfTmpQDznOqEdhQgaGtjcA2mTtPQa0CYFhr26XQUX/lTqI49Dwvyl5TL1/DzXxsPQufxGgPqk1efqYXKuQNMWLZWcwojAhIxETv9QJ+M4W6G12R8RzHdqhAA0pKWCqvB3t4aJ4/xt/3b8JJq/DAc767tcEJvS/Zu4Eyizg2OgG296WSV16gj/fRDWVUZ9PGlPfE3eklHFU8zsx6qWNacvcSkJD/9xpU4wJWmyfmdaSg37Glsbe0oqelqFhnNqggGxJCWPq7b1bNRRslKAsRiljMsC/HI06q+N1hKmxBgmf2DKBMY+IugV/CcvEhPb7LIiKIjNFwpj+MRnFMkpAnaCdMibYfGiboXCc+iGm+h1oLFgksLxYNJHm7E9ZFg8027WIqkVzC4bGBJ9fRbRJgHpyShcTGlTQ46UzqaDeBHB2YaQR6cQKktAgbIDU3rmUMc3Ac5G4h6u9IWEvStn0CsOWkcHbOBp/ICYkUCQJ2fouyTK/IhMEtSkrZUxDsO8Jv6cke0wCOtYDTjkG3Zuw2BW37Ods9JWFCWWiAiXSxgTiLQn/7jfABKeH0JhKzLBHPIVekDX+ItsTVTWOqRAHk+C1M6iX0wNRmARYOo4pNibHLBcVkzXocUwZYPKuy67HZBCY6hyTrWQxCe668XpMVlFQJo7p3DbJYfIEq5hXLyEmWqGAVvFUkDnHdB2mroCN1afbQONgu35B3eYBMbK8Uif4yBAmxxSIqaXiEL1zu4Kvxio8LBbK6ojIqkoZi1K26f00TLpMhSWfhj0QoUdYyAmheJUF8XyLHE4cUwCmujVvYMvdKYIVdAwj1CmmJiw15chAfniOyR/TMWYFn9t3ihmDMXrPlN0HSkaj6Bzt14CxLt8Y0+U6+2Ba41B/oLCYHA8IjveuHzuABK+H2axLRKwg5zz+xW+Lad5p+KqjBWAi9zdFwXQKp8Qu79Ppv8gpEeYIMnRELdqLjVMkv3EmKUyB2maJyTpSGUq3mw0f6eezMdArat/h1JNNIhYtOcU0zhQTtc3MHhDlMbr+hPaK2gm1jvsUS22aeW442aQqsS+RY7J0CROMx7N0dOVSAazbacP07Ms2terg5WnicfVTm61LxvbxMMp3Hp9oJ9Yzx3QZE/XwZBuNJHJzkzGZb1utu1arNW7O9YVhl7PlNrTPjqiuYfiaq9hgGY7JI+/MToQ9jK2W04L3Rnvk2gIL0tU22+OPcUyXMFGeWvvniFUZLW8xArdHk+KYQmGiWrZr3/jiLvaTPCZWeqxkBMrCMYXDRG2EtrenUydGkPJuvjWxQZdVF/TSLccUClOhQQx79kYZ70ukgsS0NDYHseqAwOcmxxQOEzW6Obto1qH8gxPGdKcF9af2Y0Fm78na/Tgmb2OxmGQCxsIJxAwT/9pmLUn0wS+2ulOpILMeJ51jComJXNQ5p3jI0xChleB2pt/iw/5dcGLIKseYrjhaihGMeq37BCdDg/eYKMlpH6e8Dj7robvFL6lUqTo7e+ElsHfqu2B6MoTQMuz3nqkLcNWZKUBiHZmtB+CnVscU1QnICYPPNR0XxX2VgNTZNMk+VV9tN2v6UL1Ba8X819r6xvlTSRumkBMmsMUPU6XPqHc6qG3EXu9/1tic1lFuIAVxXKyNSauGV8MutKSCq8emMEFifPa1DO93TCHBy8iIqjVwUbztLzfWm/HrRKjbJ/nVhYXefNpMO0Ev0NUGz/OJcUjdFfTtZuDSYKuhhrDpFcsPfx+8+nvaeLEE15cgo1h8v5DijOmHyDpfV3NOgtW8p+z653AyHBKHPanb91R/ICeVdd41dd3D6WKKH4YpE/F3sudCHFMuxDHlQhxTLsQx5UIcUy7EMeVCHFMuxDHlQhxTLnQTTCLHdKX6ib4dOiwm4mXiXIF6SPz9jpel7G9d69zpgzhHLXVMu1vXOneaJfzm4RDCHl6ui3rLfNRT/N5Rw+WvUTnj7oTPcuMKoV0K7x8OosRnpkjqfWQ5PYn4mFGuUOrtyll1KFEp874UWaN97T51UlYwS23P56UY6s12b8tyylq+7WbOGu//Tx60y7vNhpQAAAAASUVORK5CYII="
        alt=""
      />

      <form>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="full name (required if registering)"
        />
        <input
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
          type="text"
          placeholder="Profile pic URL (optional)"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
        <button onClick={loginToApp}>Sign In</button>
      </form>

      <p>
        Not a munber?{" "}
        <span className="login_register" onClick={register}>
          Register Now
        </span>
      </p>
    </div>
  );
}

export default Login;
