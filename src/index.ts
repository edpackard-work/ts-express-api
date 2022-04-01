import { app } from "./app";
import { dbConnect } from "./dbConnect";

const PORT = process.env.PORT || 3000;

(async () => {
  await dbConnect();
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
})();
