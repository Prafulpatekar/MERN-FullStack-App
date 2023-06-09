import jwt from "jsonwebtoken";

const accessTokenGenrator = (user) => {
  return jwt.sign(
    {
      user: {
        id: user.id
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );
};

export default accessTokenGenrator;
