const EXTERNAL_USER = process.env.EXTERNAL_USER ?? "";
const EXTERNAL_PASS = process.env.EXTERNAL_PASS ?? "";


const getClient = async (courseID = "", email = "") => {
  const token = await login();
  const apiResponse = await fetch(
    `https://api.codigoencasa.com/v1/points/redeem`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ courseID, email }),
    }
  );

  const data = await apiResponse.json();
  return data.statusCode;
};

const saveTicket = async (email) => {
  const apiResponse = await fetch(
    `https://api.codigoencasa.com/v1/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name:'Custom WS',
        description: 'Soy un comprador desde el Bot de WS',
        email,
        password:`soy_chatbot_${Date.now()}`,
        byRefCode: "LEIFERMENDEZ",
      }),
    }
  );

  const data = await apiResponse.json();
  return data.data.user._id;
};


module.exports = { getClient, saveTicket };
