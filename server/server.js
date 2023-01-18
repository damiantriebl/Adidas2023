import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import passport from "passport";
import passportLocal from "passport-local";
import session from "express-session";
import usuariosDaoMongo from "./persistencia/usuariosMongo.js";
import bcrypt from "bcryptjs";
import { UserRouter } from "./routes/User.Routes.js";
import { ProductosRouter } from "./routes/Productos.Routes.js";
import { CarritoRouter } from "./routes/Carro.Router.js";
import { EmailRouter } from "./routes/email.Router.js";
import * as dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import http from "http";
import comentariosNormalizer from "./negocio/comentariosNormalizer.js";
import { OrdenesRouter } from "./routes/Ordenes.Router.js";
import chatNormalizer from "./negocio/chatNormalizer.js";

dotenv.config();

const LocalStrategy = passportLocal.Strategy;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin:  "*", credentials: true }));
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(UserRouter);
app.use(ProductosRouter);
app.use(CarritoRouter);
app.use(EmailRouter);
app.use(OrdenesRouter);
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      const usuario = await new usuariosDaoMongo().getByEmail(email);
      if (usuario === "err") throw err;
      if (usuario) {
        bcrypt.compare(password, usuario.password, function (error, isMatch) {
          if (error) {
            return done(null, false);
          }
          return done(null, usuario);
        });
      } else {
        return done(null, false);
      }
      return false;
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  let user = Users.find((user) => user.id === id);
  done(null, user);
});

app.post("/api/login", passport.authenticate("local"), (req, res) => {
  const userSended = {
    id: req?.user._id,
    nombre: req?.user.nombre,
    avatar: req?.user.avatar,
    edad: req?.user.edad,
    direccion: req?.user.direccion,
    email: req?.user.email,
    isAdmin: req?.user.isAdmin,
  };
  res.send({ user: userSended });
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket) => {
  const listaComentarios =
    await new comentariosNormalizer().cargarTodosLosComentarios();
  socket.emit("comentarios", listaComentarios);

  socket.on("message", async (data) => {
    await new comentariosNormalizer().guardarComentario({
      nombre: data.body.nombre,
      titulo: data.body.titulo,
      comentario: data.body.comentario,
      tipo: data.body.tipo,
      fecha: new Date().toLocaleDateString("es-ar", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    });
    const listaComentarios =
      await new comentariosNormalizer().cargarTodosLosComentarios();
    io.sockets.emit("comentarios", listaComentarios);
  });
  const chat = await new chatNormalizer().cargarChatPorEmail("damiantriebl@gmail.com");
  io.sockets.emit("chatMessage", chat);

  socket.on("recibir", async (data) => {
    await new chatNormalizer().guardarChat({
      email: data.body.email,
      nombre: data.body.nombre,
      mensaje: data.body.mensaje,
    });
    const chatNuevos = await new chatNormalizer().cargarChatPorEmail("damiantriebl@gmail.com");
    io.sockets.emit("chatMessage", chatNuevos);
  });

});

const PORT = process.env.PORT || 4000;

app.listen(4000, () => {
  console.log("Se esta escuchando", PORT);
});
server.listen(4001, () => {
  console.log(`server de websocket escuchando en el ${4001}`);
});
