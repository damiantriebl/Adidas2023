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
import passportJwt from "passport-jwt";
import jwt from "jsonwebtoken";
dotenv.config();

const LocalStrategy = passportLocal.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.SECRETO;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(
  session({
    secret: process.env.SECRETO,
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
  "login",
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
            return done(null, false, {
              mensaje: "le erraste en la contraseña",
            });
          }
          return done(null, usuario, { mensaje: "logueado correctamente" });
        });
      } else {
        return done(null, false, { mensaje: "no pegaste ni el usuario" });
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

app.post("/api/login", (req, res, next) => {
  passport.authenticate("login", (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("new Error");
        return next(error);
      }

      req.login(user, { session: false }, async (err) => {
        if (err) return next(err);
        let body = {
          id: user._id,
          nombre: user.nombre,
          avatar: user.avatar,
          edad: user.edad,
          direccion: user.direccion,
          email: user.email,
          isAdmin: user.isAdmin,
        };
        const token = jwt.sign({ user: body }, process.env.SECRETO, {
          expiresIn: process.env.EXPIRACION,
        });
        body.token = token;
        res.json({ body });
      });
    } catch (e) {
      return next(e);
    }
  })(req, res, next);
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", ""],
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
  const chat = await new chatNormalizer().cargarChatPorEmail(
    process.env.MAIL_USER
  );
  io.sockets.emit("chatMessage", chat);

  socket.on("recibir", async (data) => {
    await new chatNormalizer().guardarChat({
      email: data.body.email,
      nombre: data.body.nombre,
      mensaje: data.body.mensaje,
    });
    const chatNuevos = await new chatNormalizer().cargarChatPorEmail(
      process.env.MAIL_USER
    );
    io.sockets.emit("chatMessage", chatNuevos);
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Se esta escuchando", PORT);
});
server.listen(process.env.WEBSOCKET_PORT, () => {
  console.log(
    `server de websocket escuchando en el ${process.env.WEBSOCKET_PORT}`
  );
});
