import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

class User {
  // Get all users
  async index(req, res) {
    const users = await prisma.user.findMany();
    return res.json(users);
  }

  // Search a single user
  async search(req, res) {
    const id = parseInt(req.params.id);

    const user = await prisma.user.findUnique({
      where: { id },
    });

    const status = user ? 200 : 404;

    return res.status(status).json(user);
  }

  //Create new user
  async create(req, res) {
    const { name, email, password } = req.body;

    // User is new to application, so there's no need to pass books as a parameter

    const signup = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return res.status(200).json(signup);
  }

  // Create new Readlog
  async newBook(req, res) {
    const { userId, bookId } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!user) {
      return res
        .status(404)
        .json({ error: "Could not find user by passed ID" });
    }

    if (!book) {
      return res
        .status(404)
        .json({ error: "Could not find book by passed ID" });
    }

    console.log(book);
    console.log(user);

    const addToShelf = await prisma.readLog.create({
      data: {
        status: "INSHELF",
        progress: 0,
        userId: user.id,
        bookId: book.id,
      },
    });

    return res.json(addToShelf);
  }
}

export default new User();
