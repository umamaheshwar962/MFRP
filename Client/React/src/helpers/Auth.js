import jwt from "jsonwebtoken";
import cookies from "js-cookie";

function Auth() {
  let userId = "";
  jwt.verify(cookies.get("clientToken"), "UmaMahesh", (err, decodedT) => {
    if (err) {
      if (err.message !== "jwt must be provided") console.log(err.message);
    } else {
      userId = decodedT.userId;
    }
  });
  return userId;
}

export default Auth;
