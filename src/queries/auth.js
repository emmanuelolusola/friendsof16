import instance from "./auth.config";

export const events = async (body) => {
  try {
    const { data } = await instance.get("/events", body);
    return data;
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const bookings = async (body) => {
  try {
    const { data } = await instance.post("/bookings/rsvp", body);
    return data;
  } catch (err) {
    console.log(err.response.data.message);
  }
};

export const getEvent = async (id) => {
  try {
    const { data } = await instance.get(`/events/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const coworking = async (body) => {
  try {
    const { data } = await instance.post("/bookings/cowork", body);
    return data;
  } catch (err) {
    console.log(err.response.data.message);
  }
};
