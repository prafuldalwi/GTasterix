
class DatabaseError extends Error {
    constructor(message) {
      super(message);
      this.name = "DatabaseError";
    }
  }
  
  function connectDB(status) {
    if (!status) {
      throw new DatabaseError("Database Connection Failed");
    }
  
    return "Connected";
  }
  
  try {
    console.log(connectDB(false));
  } catch (err) {
  
    if (err instanceof DatabaseError) {
      console.error("DB ERROR:", err.message);
    } else {
      console.error("Unknown Error");
    }
  }