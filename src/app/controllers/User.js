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
    const { name, email } = req.body;

    // User is new to application, so there's no need to pass books as a parameter

    const signup = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    return res.status(200).json(signup);
  }

  async newBook(req, res) {
    const { userId, bookId } = req.body;
  }
}

export default new User();
