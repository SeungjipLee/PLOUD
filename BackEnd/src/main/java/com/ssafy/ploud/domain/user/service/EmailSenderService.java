package com.ssafy.ploud.domain.user.service;

import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;


public class EmailSenderService {

  // 구글 이메일
  static final String sender_email = "ploud.e207@gmail.com";
  // 구글 비번
  static final String sender_pw = "wjhx yiug koab xxzp";

  static final String smtp_host = "smtp.gmail.com";
  static final int smtp_port = 465;  // TLS : 587, SSL : 465

  public static void SendResetPasswordMail(String userEmail, String tmpPassword)
      throws MessagingException {

    Session session = getSession();

    Message message = new MimeMessage(session);
    message.setFrom(new InternetAddress(sender_email));

    // 받는 이메일
    message.setRecipients(
        Message.RecipientType.TO,
        InternetAddress.parse(userEmail)
    );

    // 제목
    message.setSubject("pLoud 임시 비밀번호 안내 이메일입니다.");

    // 내용
    message.setText(
        "안녕하세요. pLoud 임시 비밀번호 안내 메일입니다.\n회원님의 임시 비밀번호는 아래와 같습니다. 로그인 후 반드시 비밀번호를 재설정해주세요.\n"
            + tmpPassword);

    // 발송
    Transport.send(message);

  }

  private static Session getSession() {
    Properties props = System.getProperties();
    props.put("mail.smtp.host", smtp_host);
    props.put("mail.smtp.port", smtp_port);
    props.put("mail.smtp.auth", "true");
    props.put("mail.smtp.ssl.enable", "true");
    props.put("mail.smtp.ssl.trust", smtp_host);
    props.put("mail.smtp.ssl.protocols", "TLSv1.2");
    props.put("mail.smtp.starttls.enable", "true");

    return Session.getInstance(props,
        new javax.mail.Authenticator() {
          protected PasswordAuthentication getPasswordAuthentication() {
            return new PasswordAuthentication(sender_email, sender_pw);
          }
        });
  }

}
