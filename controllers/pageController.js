const nodemailer = require('nodemailer');
const Course = require('../models/Category');
const User = require('../models/User');

exports.getIndexPage = async (req, res) => {
  const courses = await Course.find();
  const totalCourses = await Course.find().countDocuments();
  const totalStudents = await User.find().countDocuments({ role: 'Öğrenci' });
  const totalTeachers = await User.find().countDocuments({ role: 'Öğretmen' });
  res.status(200).render('main.ejs', {
    page_name: 'home',
    courses,
    totalCourses,
    totalStudents,
    totalTeachers,
  });
};

exports.getAboutPage = (req, res) => {
  res.status(200).render('about.ejs', {
    page_name: 'about',
  });
};

exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', {
    page_name: 'register',
  });
};

exports.getLogInPage = (req, res) => {
  res.status(200).render('login', {
    page_name: 'login',
  });
};

exports.getContactPage = (req, res) => {
  res.status(200).render('contact', {
    page_name: 'contact',
  });
};

exports.sendEmail = async (req, res) => {
  try {
    const outPutMessage = `
  <h1>Mail Detayları</h1>
  <p>İsim: ${req.body.name} </p>
  <p>Email: ${req.body.email} </p>
  <h1>Mesaj</h1>
  <p>Mesaj: ${req.body.message} </p>
  `;
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // gmail account
        pass: testAccount.pass, // gmail password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"SmartEDU Contact Form" <user@gmail.com>', // sender address
      to: 'incoming@gmail.com, baz@example.com', // list of receivers
      subject: 'SmartEDU Contact Form New Message ✔', // Subject line
      html: outPutMessage, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    req.flash('success', 'Mesajınız başarılı bir şekilde iletildi.');

    res.status(200).redirect('/contact');
  } catch (error) {
    req.flash('error', 'Mesajınız iletilmedi.');
    res.status(200).redirect('/contact');
  }
};
