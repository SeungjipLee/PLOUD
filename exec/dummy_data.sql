-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Database: ploud_db
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+09:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `boards`
--

DROP TABLE IF EXISTS `boards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `boards` (
  `board_id` int NOT NULL AUTO_INCREMENT,
  `like_count` int NOT NULL,
  `register_time` datetime(6) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `video_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`board_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boards`
--

LOCK TABLES `boards` WRITE;
/*!40000 ALTER TABLE `boards` DISABLE KEYS */;
/*!40000 ALTER TABLE `boards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories_seq`
--

DROP TABLE IF EXISTS `categories_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories_seq`
--

LOCK TABLES `categories_seq` WRITE;
/*!40000 ALTER TABLE `categories_seq` DISABLE KEYS */;
INSERT INTO `categories_seq` VALUES (1);
/*!40000 ALTER TABLE `categories_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `board_id` int NOT NULL,
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `register_time` datetime(6) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`comment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `complains`
--

DROP TABLE IF EXISTS `complains`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `complains` (
  `complain_id` int NOT NULL AUTO_INCREMENT,
  `restriction` bit(1) NOT NULL,
  `complain_time` datetime(6) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`complain_id`),
  KEY `FK1sedeo0xhcs4xw54pbtwac8sv` (`user_id`),
  CONSTRAINT `FK1sedeo0xhcs4xw54pbtwac8sv` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `complains`
--

LOCK TABLES `complains` WRITE;
/*!40000 ALTER TABLE `complains` DISABLE KEYS */;
/*!40000 ALTER TABLE `complains` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedbacks`
--

DROP TABLE IF EXISTS `feedbacks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedbacks` (
  `feedback_id` int NOT NULL AUTO_INCREMENT,
  `speech_id` int DEFAULT NULL,
  `time_log` decimal(21,0) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`feedback_id`),
  KEY `FKds6680sgcfbfwpeflkqp1skyc` (`speech_id`),
  CONSTRAINT `FKds6680sgcfbfwpeflkqp1skyc` FOREIGN KEY (`speech_id`) REFERENCES `speeches` (`speech_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedbacks`
--

LOCK TABLES `feedbacks` WRITE;
/*!40000 ALTER TABLE `feedbacks` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedbacks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedbacks_seq`
--

DROP TABLE IF EXISTS `feedbacks_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedbacks_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedbacks_seq`
--

LOCK TABLES `feedbacks_seq` WRITE;
/*!40000 ALTER TABLE `feedbacks_seq` DISABLE KEYS */;
INSERT INTO `feedbacks_seq` VALUES (1);
/*!40000 ALTER TABLE `feedbacks_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hearts`
--

DROP TABLE IF EXISTS `hearts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hearts` (
  `board_id` int DEFAULT NULL,
  `heart_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`heart_id`),
  KEY `FK40lxmawhacj6sagxj9hfqllj6` (`board_id`),
  CONSTRAINT `FK40lxmawhacj6sagxj9hfqllj6` FOREIGN KEY (`board_id`) REFERENCES `boards` (`board_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hearts`
--

LOCK TABLES `hearts` WRITE;
/*!40000 ALTER TABLE `hearts` DISABLE KEYS */;
/*!40000 ALTER TABLE `hearts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scores`
--

DROP TABLE IF EXISTS `scores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scores` (
  `clarity` int NOT NULL,
  `score_id` int NOT NULL AUTO_INCREMENT,
  `speed` int NOT NULL,
  `volume` int NOT NULL,
  PRIMARY KEY (`score_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scores`
--

LOCK TABLES `scores` WRITE;
/*!40000 ALTER TABLE `scores` DISABLE KEYS */;
/*!40000 ALTER TABLE `scores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scores_seq`
--

DROP TABLE IF EXISTS `scores_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scores_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scores_seq`
--

LOCK TABLES `scores_seq` WRITE;
/*!40000 ALTER TABLE `scores_seq` DISABLE KEYS */;
INSERT INTO `scores_seq` VALUES (1);
/*!40000 ALTER TABLE `scores_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scripts`
--

DROP TABLE IF EXISTS `scripts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scripts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` longtext,
  `original_video` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `category` enum('MYSCRIPT','NEWS','SPEECH') DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scripts`
--

LOCK TABLES `scripts` WRITE;
/*!40000 ALTER TABLE `scripts` DISABLE KEYS */;
/*!40000 ALTER TABLE `scripts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scripts_seq`
--

DROP TABLE IF EXISTS `scripts_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scripts_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scripts_seq`
--

LOCK TABLES `scripts_seq` WRITE;
/*!40000 ALTER TABLE `scripts_seq` DISABLE KEYS */;
INSERT INTO `scripts_seq` VALUES (1);
/*!40000 ALTER TABLE `scripts_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sentence_entity`
--

DROP TABLE IF EXISTS `sentence_entity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sentence_entity` (
  `sentence_id` int NOT NULL AUTO_INCREMENT,
  `sentence` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`sentence_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sentence_entity`
--

LOCK TABLES `sentence_entity` WRITE;
/*!40000 ALTER TABLE `sentence_entity` DISABLE KEYS */;
/*!40000 ALTER TABLE `sentence_entity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sentences`
--

DROP TABLE IF EXISTS `sentences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sentences` (
  `sentence_id` int NOT NULL AUTO_INCREMENT,
  `sentence` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`sentence_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sentences`
--

LOCK TABLES `sentences` WRITE;
/*!40000 ALTER TABLE `sentences` DISABLE KEYS */;
/*!40000 ALTER TABLE `sentences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `speeches`
--

DROP TABLE IF EXISTS `speeches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `speeches` (
  `category_id` int NOT NULL,
  `personal` bit(1) NOT NULL,
  `score_id` int DEFAULT NULL,
  `script_id` int DEFAULT NULL,
  `speech_id` int NOT NULL AUTO_INCREMENT,
  `video_id` int DEFAULT NULL,
  `record_time` datetime(6) DEFAULT NULL,
  `speech_end_time` datetime(6) DEFAULT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`speech_id`),
  UNIQUE KEY `UK_kbkamk5697i8s33wg5eooq1pj` (`score_id`),
  UNIQUE KEY `UK_jvv9xjk4iv94u61ibomdiowad` (`video_id`),
  KEY `FKacd2hwkrm9hm114j7so5lkkkm` (`script_id`),
  KEY `FKrlmed141cxngpajafph75121a` (`user_id`),
  CONSTRAINT `FKacd2hwkrm9hm114j7so5lkkkm` FOREIGN KEY (`script_id`) REFERENCES `scripts` (`id`),
  CONSTRAINT `FKcw02qef8tqvabroy2c0l9egvx` FOREIGN KEY (`score_id`) REFERENCES `scores` (`score_id`),
  CONSTRAINT `FKm6gi42xfk4p0cotopnrh95m9c` FOREIGN KEY (`video_id`) REFERENCES `videos` (`video_id`),
  CONSTRAINT `FKrlmed141cxngpajafph75121a` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `speeches`
--

LOCK TABLES `speeches` WRITE;
/*!40000 ALTER TABLE `speeches` DISABLE KEYS */;
/*!40000 ALTER TABLE `speeches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `speeches_seq`
--

DROP TABLE IF EXISTS `speeches_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `speeches_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `speeches_seq`
--

LOCK TABLES `speeches_seq` WRITE;
/*!40000 ALTER TABLE `speeches_seq` DISABLE KEYS */;
INSERT INTO `speeches_seq` VALUES (1);
/*!40000 ALTER TABLE `speeches_seq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `birth_year` int DEFAULT NULL,
  `complain_count` int NOT NULL,
  `join_date` datetime(6) DEFAULT NULL,
  `restrict_date` datetime(6) DEFAULT NULL,
  `solo_duration_in_minute` bigint NOT NULL,
  `study_duration_in_minute` bigint NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `profile_img` varchar(255) DEFAULT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `user_id` varchar(255) NOT NULL,
  `role` enum('ADMIN','USER') DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `videos`
--

DROP TABLE IF EXISTS `videos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `videos` (
  `video_id` int NOT NULL AUTO_INCREMENT,
  `play_time` bigint NOT NULL,
  `video_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`video_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videos`
--

LOCK TABLES `videos` WRITE;
/*!40000 ALTER TABLE `videos` DISABLE KEYS */;
/*!40000 ALTER TABLE `videos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `videos_seq`
--

DROP TABLE IF EXISTS `videos_seq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `videos_seq` (
  `next_val` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `videos_seq`
--

LOCK TABLES `videos_seq` WRITE;
/*!40000 ALTER TABLE `videos_seq` DISABLE KEYS */;
INSERT INTO `videos_seq` VALUES (1);
/*!40000 ALTER TABLE `videos_seq` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- dummy data for sentences table
insert into `sentences`(sentence) values("준비한 연사만이 자신감을 가질 자격이 있다.");
insert into `sentences`(sentence) values("추상적인 이야기 보다는 구체적으로 표현하라.");
insert into `sentences`(sentence) values("자신의 생각을 먼저 정리하라.");
insert into `sentences`(sentence) values("서술형식보다 예화형식을 잘 활용하라.");
insert into `sentences`(sentence) values("형식적이 되지말고, 진심과 열정을 스피치에 담아라.");
insert into `sentences`(sentence) values("상투어를 피하고 생생한 표현을 하라.");
insert into `sentences`(sentence) values("언제나 청중을 잊지말라.");
insert into `sentences`(sentence) values("자신만의 개성을 살리는 연설이 되게 하라.");
insert into `sentences`(sentence) values("주제를 구체적이고 좁게 잡아라.");
insert into `sentences`(sentence) values("짧고 간단한 문장을 활용하라.");
insert into `sentences`(sentence) values("자신의 연설 내용을 시각화하라.");
insert into `sentences`(sentence) values("알기쉬운 용어를 사용하라.");
insert into `sentences`(sentence) values("흥미로운 주제, 청중이 관심을 가질만한 주제를 택하라.");
insert into `sentences`(sentence) values("청중과 상호 커뮤니케이션 하는 연설을 하라.");
insert into `sentences`(sentence) values("타인을 설득하기 이전에 먼저 연사 자신의 마음이 굳건해야 한다.");
insert into `sentences`(sentence) values("로보트가 되지 말고 인간답게 자연스럽게 얘기하라.");
insert into `sentences`(sentence) values("목소리는 힘차면서도 부드럽게 하라.");
insert into `sentences`(sentence) values("청중과 아이컨텍을 잘해라.");
insert into `sentences`(sentence) values("평소에 자신을 갈고 닦고, 인격을 쌓자.");
insert into `sentences`(sentence) values("항상 준비하는 습관을 가지자.");
insert into `sentences`(sentence) values("흥미를 끄는 시작을 하라.");
insert into `sentences`(sentence) values("여운과 감동이 있는 멋있는 끝맺음을 하라.");

-- dummy data for scripts table
insert into `scripts`(content, original_video, title, category)
values("존경하는 국민여러분, 존경하는 김수한 국회의장과 의원여러분 그리고 윤관 대법원장과 김용준 헌법 재판소장을 비롯한 내외 귀빈 여러분.

오늘 역사적인 대한민국 국회 개원 50주년을 맞게 된 것 경축하며 여러분과 함께 기쁨을 나누고자 합니다. 제 개인적으로도 이 국회를 중심으로 40여 년 동안 우여곡절의 정치인생을 보내왔기에 오늘 이자리가 감개무량하지 그지없습니다. 특히 우리 헌정사에서 처음으로 여야 간 정권교체가 이루어져서 국민의 정부, 대통령으로서 이 자리에 서게 된 것이 크나큰 영광으로 생각하며 국민의 대표인 의원여러분께 감사말씀을 드립니다.

아울러 오늘 우리나라 국회를 발전시킨 공로로 국민훈장을 받으신 김수한 국회의장을 비롯한 박준규, 이만섭, 황낙주, 전직 국희의장들에게 진심으로 축하를 드리는 바입니다.

의원여러분, 3·1독립운동의 숭고한 정신을 이어받아 민주주의에 대한 국민의 여망을 안고 재헌 국회가 출범한지 반세기가 흘렀습니다. 그동안 우리정치는 참으로 많은 곡절과 변화를 겪었습니다. 권위주의 시대를 거쳐 오는 동안 우리 후세는 여야 가릴 것 없이 국회의 가진 역할을 빼앗긴 채 정치가 실종되고 민의가 무시되는 어려운 시기를 보내야 했습니다.

 

그러한 가운데, 비록 후퇴도 있었고 좌절도 있었지만 우리의 민주주의는 때로는 비약적으로 때로는 한 단계씩 전진해왔습니다.

그리하여 마침내 야당도 여당이 될 수 있는 선진 정치문화가 이 땅에 만개하는 대변혁을 이루게 되었습니다. 오늘 이 자리를 빌려 이 국회를 만드시고 의회 민주주의를 발전시켜 오신 재헌 의회 선배의원들과 역대 국회의원들 그리고 수많은 자유민주주의 신봉자들에게 감사와 존경의 말씀을 드리는 바입니다.

존경하는 여야 국회의원 여러분, 지금 우리는 6,25 정난이후 최대의 국난에 처해있습니다. 민주주의가 없는 경제성장의 허약한 실체가 적나라하게 드러났습니다. 이 엄청난 국난을 해쳐나가기 위해 국민의 정부는 민주주의와 시장경제의 병행발전을 국정목표로 한 바 있습니다. 민주주의를 발전시켜야만 관치금융과 정경유착 그리고 부정부패의 악습을 뿌리 뽑고 올바른 시장경제체제를 확립할 수 있습니다.

민주주의의 꽃은 의회민주주의입니다. 국회는 나랏일을 논의하는 토론장이자 국민의 이익을 보호하는 회의장이 돼야 합니다. 국회는 그런 자신의 역할을 충분히 다해왔는지 항상 반성해야할 것입니다. 의원여러분이 이 의사당에서 헌법을 준수하고 국가의 이익을 우선으로 하며 직무를 수행하겠다고 국민 앞에 선서했습니다. 오늘 이 자리에서 우리 다 같이 이 선서를 되새깁시다. 의원여러분, 그리고 내외 귀빈여러분 저는 의원여러분과 국회의 권의를 존중합니다. 우리 국회가 소모적인 경쟁을 지향하고 정부에 대해 건전하게 비판하고 견제하는 국정의 참다운 동반자가 되기를 바라고 있습니다. 여당은 언제나 겸허한 자세로 야당의 비판에 귀를 기울이며 대화 협상을 통해 국정을 같이 끌어나간다는 자세를 견지해야 합니다.

야당도 국난의 시기에 정부와 여당을 도와 위기를 타계함으로써 국민의 기대에 부응해야겠습니다. 또한 국회는 스스로 개혁에 투자를 게을리 해서는 안 됩니다. 국회는 정치개혁과 나라안정의 중심이 되어야 합니다. 이 두 가지 과제를 충실히 수행할 때 국회는 국민의 지지를 받을 수 있을 것입니다. 190회 임시국회에서 구성된 정치개혁 특별위원회가 정치구조 개선, 정치구조 개혁을 과감하게 밀고 나갈 수 있도록 여야 위원 여러분이 허심탄회하게 토론해 주기를 기대하고 있습니다. 국민 앞에서는 여당이냐 야당이냐가 중요한 것이 아니라 어느 정당이 자신을 사명과 책임을 다하고 있느냐가 중요한 것입니다. 저는 우리 국회가 국민에게 믿음을 주고 국민의 목소리에 귀를 기울이며 국가의 장래를 도모하는 생산적인 국회가 될 수 있도록 최선의 지원을 아까지 않을 것입니다.

존경하는 의원여러분, 그리고 내외 귀빈 여러분 당면한 위기의 극복은 정치, 경제, 사회, 문화 모든 분야의 대통합에서 이루어 질수 있습니다. 정파적 이해관계와 지역갈등을 뛰어넘는 국민적 화합을 달성하는 일은 바로 우리정치의 몫이며 국회가 그 기능을 수행해야 할 것입니다.

그것이 50년 연륜 속에서 성숙된 우리 국회가 민족 앞에 봉사하고 헌신하는 길일 것입니다. 오늘 이 자리를 계기로 우리 모두가 진정으로 새로운 시대를 개척하는 승리의 주역이 되기를 바라 마지않습니다. 다시 한 번 국회개원 50주년을 경축하며 의원여러분과 내외 귀빈 여러분의 건강과 행운을 바랍니다. 감사합니다.",
"https://dams.pa.go.kr/dams/PUBLICATION/2017/11/09/DOC/SRC/0204201711091117102317644016546.mp4",
"대통령 경축사",
"SPEECH");

# content, original_video, title, category
insert into `scripts`(content, original_video, title, category)
values("오늘 경축식에 나오셔서 같이 축하해 주셔서 진심으로 감사합니다. 가장 자랑스러운 민족이라는 것은 어떤 것인가, 가장 성공적으로 꾸려나가는 그러한 국민은 어떤 것인가, 이런 것을 우리가 생각해 볼 수 있습니다. 저는 어저께 당석에서도 말했습니다만 우리 대한민국 50년의 역사, 참으로 고통스럽고 기구하고 고생하고 시련이 많은 역사였습니다.

                                                                 

그러나 우리가 50년 역사를 회고해볼 때 일관되게 우리는 시련을 극복하고 모든 도전에 과감하게 응해서 그래서 그 고비마다 성공회를 열어왔습니다. 대한민국 수립, 소련의 극렬적인 반대, 북한의 반대, 남한에서 게릴라들의 선거방해, 유엔의 감시 모든 여건 속에서 그 당시 우리 국민들은 50제헌 국회의원 선거를 아주 성숙되고 평화적이고 의연한 자세로 치름으로써 유엔의 감시단도 이를 크게 평가하고 이렇게 해서  유엔이 대한민국 수립을 승인하는 그러한 성공을 거두었던 것입니다. 참으로 그때 유엔감시단은 중립 국가였던 인도의 매논 이라는 사람이 ... 되었고 반드시 대한민국에 지지하는 그런 입장만 취한 것은 아니었는데 그들이 멋대로 국민들이 국가 건설을 위한 의욕과 질서정연한 선거의 모든 과정, 공산주의자들의 투표소 습격이라든가 여러 가지 파괴행위를 극복하면서 선거를 무사히 마친 것을 보고 크게 감동을 하고 이것을 평가해서 유엔이 대한민국을 승인하도록 만들었던 것입니다. 만일 그 승인이 없었다면 대한민국은 결코 수립해 나갈 수 없었을 것입니다.

 

그 다음에 나라를 세워서 2년이 못되어 우리는 6,25라는 뜻하지 않는 비극을 맞이하게 되었습니다. 이 6.25는 북한 공산주의자들이 남침을 해서 전 한반도를 적화하려는 야욕에서고 일어난 것은 우리가 다 알고 있습니다. 그러나 그 후로 오늘날 여러 가지 문서를 보면 소련은 6.25 남침을 통해서 전 한반도를 적화해서 일본을 제압하고 태평양 지역을 자기들이 지배하려는 음모를 가지고 이 전쟁을 시작했던 국제적인 전쟁이었던 것입니다. 그것을 우리는 또한 극복해서 소련과의 희생을 감수하면서도 우리 한국 국민들이 공산주의를 결코 용납하지 않는 그 공산주의를 막아내기 위해서는 무엇도 아끼지 않고 바치겠다는 그런 우리국민들의 결의와 의욕이 결국 6.25를 성공적으로 지켜냈습니다. 아무리 유엔이 하고 미군이 왔다가더라도 한국국민의 그러한 철저한 애국심과 반공정신과 국가안보에 의한 헌신이 없었다면 미국인들이 어떻게 했겠습니까. 이런 점에 있어서 우리국민은 6.25의 시련을 이겨낸 그리고 공산주의를 저지하고 이러한 우리 국민들의 업적에 의해서 자랑스럽게 생각할 수 있는 또 하나의 역사를 이 50년 사이에 만든 것입니다.

세 번째는 경제재건 입니다. 6.25가 끝나고 보니까 남은 것은 전부 폐허가 된 국토뿐이었습니다. 그야말로 뭐 하나 쓸 것이 없었다 해도 과언이 아니었습니다. 모두가 발 뻗고 울고 이제 어떻게 살 것인가 이렇게 생각했습니다. 그러나 우리 국민들이 이를 악물고 노력해서 30년 만에 세계 11번째 경제대국을 만들어 냈습니다.

 어제 어떤 지방에 가봤는데 우리는 이 휘발유 드럼통을 두들겨서 만들었던 시발택시로부터 오늘날 세계 선진국에 가서 당당히 경쟁하는 그러한 최신의 자동차도 만들어냈습니다. 겨우 라디오를 조립했던 나라가 이제는 모든 전자분야에서 세계에 나가서 세계의 선두에 서고 있습니다. 저는 과거에 해운업을 해서 압니다. 만은 일본서 중국산 목조 선박을 수입하는 우리가 이제는 전 세계 최대의 조선국가로 부상을 해서 세계의 5대항을 다니는 배를 만들고 있습니다. 이런 일을 해낸 민족이 세계에 과연 몇이 있는가, 저는 그렇게 많지 않다고 생각합니다. 이런 예로 있어서 우리 민족은 이 시련과 도전에 대해서 과감하게 도전을해서 또 경제적 분야에서도 성공했습니다. 근데 이런 가운데 우리는 남북이 대치하고 있고 안보가 최우선하는 그러한 현실, 또 경쟁할 때를 위해서는 권위주의적 정치도 불가피하다는 그런 현실, 이런 가운데서도 국민은 민주주의를 실현하는데 한 번도 포기한 일이 없습니다.

계속되는 억압과 수난과 많은 희생에도 불구하고 우리 국민들 민주주의를 위해서 꾸준히 전진해왔습니다. 이렇게 해서 마침내 작년 12월 18일, 우리국민은 아시아에서는 그 예를 볼 수 없는 이 권위주의적 통치에 대해서 투표로, 국민의 종이 하나에 의해서 정권교체를 성공한 것입니다. 그것은 전 세계가 놀랍게 평가하는 일입니다. 이렇게 해서 건국, 6.25극복, 경제의 발전, 민주주의 실현 이런 4대 위업을 우리는 불과 50년 사이에 해냈습니다. 얼마나 자랑스러운 국민이냐는 것을 우리는 생각했습니다. 우리는 우리 국민들이 그러한 저력을 가지고 지금 우리가 겪고 있는 IMF의 실현도 반드시 극복해 낼 것입니다. 우리는 그동안 지난 3,4월까지는 외환위기를 극복하는데 전력을 다했습니다. 그래서 여러분이 아는 대로 작년 선거 때 불과 38억 7천만 불 밖에 없었던 가용 외환 보유고가 지금 10배가 넘는 400억불에 도달했습니다. 그리고 환율이라든가 금리라든가 다 하향 안정이 됐습니다. 작년에 우리는 90억불에 달하는 적자를 냈던 무역이 아마 금년에는 350억 불 정도의 흑자를 내게 될 것입니다. 우리는 이렇게 해서 외환문제는 일단 극복했습니다. 그리고 지난 4월 이후부터 지금까지는 우리가 온 힘을 다해 이 경제 개혁에 매진하고 있습니다. 우리는 경제 발전을 위해서는 밖으로는 수출을 증대시키고 외국투자를 유치해야 합니다.

 이 두 가지가 다 지금 상당히 밝은 희망을 가질 수 있게 나가는 면이 있습니다. 물론 문제점도 많습니다. 그러나 국내적으로는 아직도 우리가 해야 할 문제들이 많습니다. 금융, 기업, 공공부문, 노사문제 이 4대 부문의 개혁을 우리는 반드시 해내야 합니다. 이것을 해냄으로써 돈이 순리대로 매끄럽게 돌아가고 이 돈이 돌아감으로써 기업들이 다시 활발하게 움직입니다. 은행도 기업도 지금 잘못된 관행을 버리고 ...을 덜고 그리고 정부지원을 받아 다시 견실하게 해서 앞으로는 돈 버는 은행 , 흑자 내는 기업, 이런 기업으로 강하게 발생되어 나갑니다. 외국은행들은 우리나라에서 1년에 5,000~6,000억의 돈을 보내고 있는데 우리는 거꾸로 수십조 원이 적자인데 에는 이런 일을 우리는 어떻게 생각해야겠습니까. 그래서 이 금융과 기업 전부 흑자내고 돈 벌고 이런 기업을 만들어야 합니다. 그러지 못한 은행이나 기업은 국민의 짐 밖에 되지 않는 거니까 그런 짐은 덜어내야 합니다.

그리고 노사문제에 있어서도 이제는 과거와 같은 노사대결의 시대가 아닙니다. 이제는 노사가 서로 협력해서 세계의 경쟁에서 이겨내야 합니다.

세계경제에서 이기지 못하면 노가 이기건 사가 이기건 기업은 다 망합니다. 망하면 정부가 같이 망합니다. 그런 입장에서 노사의 관계도 새로이 해야겠습니다. 그러나 이런 개혁을 요구하기에 앞서 우리는 정부와 공공부문이 모범을 보이며 앞장서서 개혁을 해 나가겠습니다. 이 4대개혁을 성공하게 되면 아까 말한 것과 같이 금융도 매끄럽게 돌고 기업들도 경쟁력이 생겨 세계에서 물품을 많이 파는데 팔로가 열려 나가고 이렇게 하면 다시 일자리가 생기고 우리경제가 발전되고 무역의 흑자가 나오게 될 것입니다. 금년엔 적자인 GNP에서 시작하지만 몇 년이 지나면 특별한 외부사정 국제사정이 없는 한 우리는 적어도 몇 년 만에는 흑자로 돌아설 그런 확실한 전망을 가지고 있습니다. 그리고 내년에는 본격적인 재도약의 길로 나갈 수 있을 것입니다. 그런 과정에 우리는 아까 경축사에서 말한 바와 같이 실업자 중에서 어떠한 경우에도 굶어죽거나, 입을 것이 없거나, 병들어서 치료를 못하거나, 자식의 교육을 못시키는 일이 없도록 정부가 여기에 대해서 최선을 다하기 위해 지난 2월 노사정합의 때 5조원이었던 실업대책비가 8조4천6백억으로 늘어났다가 다시 10조 1천억으로 증가하고 있습니다. 명년에도 이런 기적은 계속 유지해야 할 것입니다.

이런 우리의 가장 밑바닥에 있는 동포들이 붕괴되지 않도록 받쳐주면서 우리는 개혁을 해 나갈 것입니다. 중소기업에 대해서도 특별한 배려를 지원하고 있습니다. 우리는 아까도 말씀했다시피 건국에 있어서 국토 발전에 있어서 경제건설에 있어서 그리고 민주화에 있어서 4대개혁을 성공했습니다. 이제 다섯 번째로 이 국난을 극복하고 세계의 일류국가로 들어가는 그러한 개혁에 우리가 반드시 성공할 것입니다. 여기계신 여러분들은 그런 의미에서 우리나라의 지도자적인 입장이 계신 분들입니다. 여러분들이 도와주지 않으면 저 혼자 해결할 수가 없습니다. 모두가 여러분이 이 나라를 위해서 정말로 “내가 아니면 누가 할 것이냐”하는 그 결심을 가지고 지도적 역할을 다해주시길 진심으로 바라고 그것이 오늘 우리가 경축일을 맞이한 우리들의 다짐이 되었습니다. 지금 우리들의 선열들, 돌아가신 국군장병들 ,민주주의에서 목숨을 바친 그 영령들 이런 분들은 오늘의 민주화에 대해서 한편으로는 기뻐하면서 또 한편으로는 나라의 국난을  우리가 슬기롭게 극복할 것을 진심으로 바라고 있을 것입니다. 우리는 그분들의 그러한 영혼에 보답할 그러한 굳은 결의를 해야겠습니다. 무엇보다도 아까 말씀 드렸지만 우리가 우리의 후손들에게 살기 힘든 나라 ,절망의 나라, 거리를 헤매는 나라 이런 나라를 넘겨줄 수는 없지 않습니까. 그런 나라는 우리로서 족합니다. 우리는 반드시 못난 조상이 되서는 안 됩니다. 우리는 조상으로서 할일을 다해서 우리 후손들에게 자랑스러운 나라를 넘겨주기 위해서 마음을 합치고 힘을 합쳐야겠습니다.

여러분의 건승을 빌고 많은 성원을 바라면서 저의 간단한 소감의 말씀을 마치겠습니다. 고맙습니다.",
"https://dams.pa.go.kr/dams/PUBLICATION/2017/11/09/DOC/SRC/0204201711091117229804639014902.mp4",
"광복 53주년 기념식",
"SPEECH");

# content, original_video, title, category
insert into `scripts`(content, original_video, title, category)
values("사랑하는 어린이 여러분.

소파 방정환 선생님이 어린이날을 만드신지 벌써 일흔일곱 번째가 되었습니다.

여러분 모두 훌륭한 어린이가 되고 21세기의 미래를 이끌어 갈 주역이 되기를 바랍니다. 그렇게 생활하기 위해서 오늘부터 제가 부탁하는 세 가지 노력을 열심히 해주시기 바랍니다.

우선은 좋은 책을 골라서 많이 읽으세요. 그리고 생각하는 습관을 길러야 합니다. 자신이 읽은 것이나 선생님의 가르침에 대해 스스로가 다시 한 번 생각해보는 사고력을 키워야합니다. 그리고 컴퓨터도 잘 배우세요. 그래야 21세기를 살아갈 여러분에게 가장 필요한 창의성을 얻을 수 있습니다.

또 하나는 남을 위해 봉사하는 마음가짐을 가져달라는 것입니다. 부모님과 형제는 물론이고 이웃과 친구들을 사랑하고 도와주는 사람이 되어야 합니다. 그런 마음가짐으로 여러분 스스로도 다른 사람들한테서 존경과 사랑을 받고 행복을 얻을 수 있기 때문입니다. 혹시 지금 부모님이 경제적 어려움이나 실직 때문에 많이 힘들어 하시면 “엄마, 아빠 힘내세요!” 라고 말해주세요. 그 말 한마디에 부모님은 큰 용기를 얻으실 것입니다.

남을 위하는 마음처럼 자신을 위할 줄도 알아야 합니다. 학교에서 왕따 같은 것을 당할 때 겁나고 힘들더라도 선생님이나 부모님에게 알려주어야 합니다. 그런 용기를 가져야 왕따도 없앨 수 있고 장차 민주 시민으로써의 인격도 키워나갈 수 있습니다. 고발정신은 민주시민이 가져야할 가장 중요한 덕목입니다.

마지막으로 튼튼한 어린이가 되어주기를 바랍니다. 요새 어린이들은 덩치는 큰데 체력이 약한 것이 흠입니다. 골고루 잘 먹어야지만 운동을 통해서 신체도 단련해야 합니다. 체력이 튼튼해야 정신도 건강해지고 모든 일에 자신감을 갖고 활기차게 해 나갈 수 있기 때문입니다.

이렇게 세 가지 노력을 하면 여러분은 한사람, 한사람 모두 훌륭한 인격을 갖춘 성공 한 사람이 될 수 있습니다. 대신 저는 여러분 부모님과 함께 어린이 여러분이 마음껏 활동할 수 있는 나라를 만들 것입니다.

어린이날을 다시 한 번 축하하며 여러분 모두에게 더없이 즐겁고 신나는 날이 되기를 바랍니다.",
"https://dams.pa.go.kr/dams/PUBLICATION/2017/11/09/DOC/SRC/0204201711091117477973347012987.mp4",
"제77회 어린이 날 축하메시지",
"SPEECH"
);

insert into scripts(content, original_video, title, category)
values("전세계에서 큰 인기를 누린 시트콤 '프렌즈' 대본이 영국에서 2만 2천 파운드, 우리 돈 3천7백만 원에 낙찰됐습니다.

경매전 예상가보다 무려 30배를 웃도는 금액에 팔린 데다 해당 대본이 폐기 직전에 발견됐다는 사연까지 알려져 화제입니다.

프렌즈 시즌4의 2부작 에피소드가 담겨있는 이 대본은 1998년 영국 런던 스튜디오에서 촬영을 마친 뒤 결말 유출을 막기 위해 폐기 처분됐는데요.

당시 스튜디오의 한 직원이 쓰레기통에 있던 대본을 우연히 발견해 집으로 가져갔습니다.

이후 20년 넘게 깜빡 잊고 있다가 이사를 위해 청소하다 발견했다고 합니다.

경매 업체는 시트콤 '프렌즈'가 끝난지 20년이 지났는데도, 이번 경매 과정 내내 경이로운 관심이 이어졌다고 설명했습니다."
,"https://www.youtube.com/watch?v=wKht34LN0Z4"
,"프렌즈 대본 주웠다. 알고보니 로또 수준? / KBS 2024.01.15."
,"NEWS");

insert into `scripts`(content, original_video, title, category) 
values(
"소아나 난치병 환자 치료에 쓰이는 특정 혈액제제가 몇 달째 품귀 상태입니다. 백혈구에서 생성되는 단백질인 '면역글로불린'이라는 의약품인데,  이 의약품이 꼭 필요한 위중한 환자들은 원정 진료까지 다니고 있습니다. 이자현 기자가 취재했습니다.

 [리포트]

 선천성 면역결핍 증후군에 걸린 아들을 돌보고 있는 보호잡니다.

 아들은 한 달에 한 번 충북 제천의 병원에서 면역글로불린 주사를 맞아왔는데 올해 초 약을 구할 수 없다는  통보를 받았습니다.

 수소문 끝에 결국  40km 떨어진 다른 지역 병원까지 가야 했습니다.

 [환자 보호자/음성변조 : '약이 없어서 별수 없이 3차 기관인 원주까지 가서 주사를 맞고 있는 형편입니다.']

 면역글로불린은 혈액의 백혈구에서 생성되는 단백질로 자가면역질환 치료 효과가 탁월합니다.

 가와사키병을 앓는 소아나 면역결핍 환자용 필수 의약품이지만 지난해 6월부터 품절되기 시작했습니다.

 [최용재/대한아동병원협회 회장 : '어디에서 구해도 없고…. 이 치료를 하면 살고, 치료를 못하면 죽고, 이런 상황도 갈 수가 있기 때문에 일단 이 환자가 의심될 때 겁이 나요.']

 면역글로불린의 원료인 혈장 공급량이 5년 새 10만ℓ나 줄면서  공급에 차질이 빚어진 겁니다.

 급한 대로 미국에서 혈장을 수입하고는 있지만 국내보다 2배 이상 비쌉니다.

 제약사로서는 수지 타산이 맞지 않다 보니 면역글로불린을 충분히 생산할 수 없는 상황이라는 지적입니다.

 [정현철/식약처 바이오의약품정책과장 : '(수입 혈장은) 미국에서만 수입하고 있어서 혈장 수입을 다변화하기 위해서 유럽 등 여러 국가를 지금 현재 타진하고 있고요.']

 보건 당국은 위중한 환자를 살릴 면역제제 수급 안정을 위해 헌혈 확대가 시급하다고 강조합니다.",
 "https://www.youtube.com/watch?v=DsvaSvhxla4",
 "“혈액이 부족해서”…소아·중환자 치료 ‘면역글로불린’ 품귀 비상 / KBS 2024.02.01.",
 "NEWS"
);

insert into `scripts`(content, original_video, title, category)
values("수도 파리 외곽의 고속도로를 며칠째 트랙터로 점거 중인 프랑스 농민들의 시위가 격해지고 있습니다. 최대 규모 농산물 시장 등을 봉쇄하려던 90여 명이 당국에 체포됐습니다. 시위가 유럽으로 확대되자 유럽연합이 긴급히 대책을 내놨습니다. 파리 안다영 특파원입니다.

 [리포트]

 프랑스 파리 외곽의 최대 국제 농산물 시장까지 10km 거리를 남겨둔 지점, 프랑스 동부와 남부에서 올라온 트랙터 시위대가 이 시장으로 통하는 길을  사방에서 봉쇄했습니다.

 파리 외곽을 포위했던 시위대가 이 시장으로 방향을 튼 건 저렴한 외국산 농산물 수입에  항의하기 위해섭니다.

 [페데릭 페랑드/시위 참가 프랑스 농민 : '우리의 이야기를 듣지 않는다면 제 개인적인 생각이지만 이대로 갈 수는 없다고 봅니다. 더 극단적으로 갈 수도 있다고 생각합니다.']

 프랑스 정부는  시장 입구에  경찰과 헌병 수백 명을 배치하고  장갑차 벽도 세웠습니다.

 이곳이 막히면  유통업체나 식당 등으로  농산물 수급에 차질이 불가피하기 때문입니다.

 시장 입구 봉쇄를 시도하던 농민 15명이 교통 방해 혐의로  체포되는 일도 벌어졌습니다.

 또 다른 시위대는 한 대형 유통업체 창고에 침입을 시도했다가  이 과정에서 79명이 체포됐습니다.

 [제랄드 다르마냉/프랑스 내무부 장관 : '우리는 정부 기관 건물, 세무서, 식료품점 등을 파손하거나 외국 농산물을 운송하는 트럭을 볼모로 삼을 수 있는 공격은 용납하지 않을 것입니다.']

 프랑스뿐 아니라 독일과 벨기에 등 유럽 각국에서 농민 시위가 거세지자 유럽연합이 농업 지원 대책을 내놨습니다.

 EU 집행위는 유럽 농민들의 불만사항 중 하나인  우크라이나산 농산물 면세 조처와 관련해 대상 품목의 수입량이  지난 2년 치 평균을 초과하면  자동으로 관세를 부과하겠다고 밝혔습니다.

 또 환경 보호를 위해 휴경지를 4%로 해야 한다는 의무도 올 한해 한시적으로 면제하는 방안을 추진하겠다고 했습니다.

 다만 이들 조치는 EU 전체 27개국의 최종 합의가 있어야 확정됩니다.

 파리에서 KBS 뉴스 안다영입니다."
,"https://www.youtube.com/watch?v=UmEJZ0190VE"
,"거세지는 프랑스 농민 시위…EU, 긴급 지원책 마련 / KBS 2024.02.01."
,"NEWS");

insert into `scripts`(content, original_video, title, category) 
values(
"소아나 난치병 환자 치료에 쓰이는 특정 혈액제제가 몇 달째 품귀 상태입니다. 백혈구에서 생성되는 단백질인 '면역글로불린'이라는 의약품인데,  이 의약품이 꼭 필요한 위중한 환자들은 원정 진료까지 다니고 있습니다. 이자현 기자가 취재했습니다.

 [리포트]

 선천성 면역결핍 증후군에 걸린 아들을 돌보고 있는 보호잡니다.

 아들은 한 달에 한 번 충북 제천의 병원에서 면역글로불린 주사를 맞아왔는데 올해 초 약을 구할 수 없다는  통보를 받았습니다.

 수소문 끝에 결국  40km 떨어진 다른 지역 병원까지 가야 했습니다.

 [환자 보호자/음성변조 : '약이 없어서 별수 없이 3차 기관인 원주까지 가서 주사를 맞고 있는 형편입니다.']

 면역글로불린은 혈액의 백혈구에서 생성되는 단백질로 자가면역질환 치료 효과가 탁월합니다.

 가와사키병을 앓는 소아나 면역결핍 환자용 필수 의약품이지만 지난해 6월부터 품절되기 시작했습니다.

 [최용재/대한아동병원협회 회장 : '어디에서 구해도 없고…. 이 치료를 하면 살고, 치료를 못하면 죽고, 이런 상황도 갈 수가 있기 때문에 일단 이 환자가 의심될 때 겁이 나요.']

 면역글로불린의 원료인 혈장 공급량이 5년 새 10만ℓ나 줄면서  공급에 차질이 빚어진 겁니다.

 급한 대로 미국에서 혈장을 수입하고는 있지만 국내보다 2배 이상 비쌉니다.

 제약사로서는 수지 타산이 맞지 않다 보니 면역글로불린을 충분히 생산할 수 없는 상황이라는 지적입니다.

 [정현철/식약처 바이오의약품정책과장 : '(수입 혈장은) 미국에서만 수입하고 있어서 혈장 수입을 다변화하기 위해서 유럽 등 여러 국가를 지금 현재 타진하고 있고요.']

 보건 당국은 위중한 환자를 살릴 면역제제 수급 안정을 위해 헌혈 확대가 시급하다고 강조합니다.",
 "https://www.youtube.com/watch?v=DsvaSvhxla4",
 "“혈액이 부족해서”…소아·중환자 치료 ‘면역글로불린’ 품귀 비상 / KBS 2024.02.01.",
 "NEWS"
);

DELIMITER //

CREATE PROCEDURE InsertScript(
    IN p_content longtext,
    IN p_original_video VARCHAR(255),
    IN p_title VARCHAR(255),
    IN p_category VARCHAR(255)
)
BEGIN
    INSERT INTO scripts (content, original_video, title, category)
    VALUES (p_content, p_original_video, p_title, p_category);
END //

CALL InsertScript("평균 온도 15도.

산소 농도 21%.

바닷물 염분 농도 3.4%.

지구는 놀라울 정도로 자기관리가 철저합니다.

자기조절 기능을 통해 스스로 최적의 생명체 생존 조건을 유지해왔습니다.

지구의 자기관리가 무너지면 대재앙이 닥칩니다.

산소 농도가 1%만 높아져도 낙뢰로 인한 산불이 70% 늘어납니다.

해수의 염분 농도가 6%가 되면 대부분의 해양 생물이 멸종합니다. 

재앙 앞에 인류는 초라할 수밖에 없습니다.

그러니, 닥치기 전에 손을 써야 합니다.

북극곰이 살고 있는 바다얼음.

겨울에는 늘어났다가 여름이 되면 줄어들어 9월에 크기가 가장 작아집니다.

문제는 지구온난화 때문에 원상복구가 잘 안된다는 겁니다.

얼음의 전체 면적이 점점 좁아지고 있다는 뜻입니다.

태양복사에너지의 반사율을 '알베도'라고 합니다.

우린 이 알베도를 통해 지구 기후의 안정성을 가늠할 수 있는데요.

과정은 이렇습니다.

지구온난화로 얼음이 줄면, 반사되지 못하고 흡수된 태양에너지가 북극해의 수온을 높입니다. 

데워진 바닷물은 다시 얼음을 녹입니다.

얼음이 더 줄어든 탓에 알베도는 더 낮아집니다.

지구가 악순환의 루프에 빠져 열기를 머금게 되는 거죠.

지구가 뜨거워진다는데, 겨울 추위는 왜 갈수록 더 심해질까, 생각해 보신 적 있나요?

찬 공기를 지구 꼭대기인 극지로 올려주는 제트기류에 이상이 생겨서 그렇습니다.

제트기류는 북극과 중위도의 공기 차가 클수록 강해지는데, 북극의 기온이 높아져 제트기류가 약해지면 찬 공기가 아래로 내려오게 됩니다.

훌라후프를 돌릴 때 속도를 낮추면 아래로 떨어지는 걸 생각하면 이해하기 쉽습니다.

올해 1월, 한반도를 비롯해 동아시아를 강타한 이상한파의 원인 중 하나가 제트기류 약화였습니다.

북극 얘기를 하면서 해수면 얘기를 빼놓을 수 없습니다.

북극의 기온이 오르면 해수면이 상승할까요?

흔히 북극 얼음이 녹으면 해수면이 올라간다고 생각하는데, 반은 맞고, 반은 틀립니다.

북극해 얼음이 녹는다는 건 바다 수온이 높아졌다는 걸 의미하죠.

수온이 오르면 해수가 열팽창을 합니다.

부피가 늘어나니, 해수면도 어느 정도 올라가겠죠.

이건 어디까지나 수온 상승의 영향일 뿐입니다.

바다 위에 떠 있는 얼음이 녹는다고 해서 곧바로 눈에 띄게 해수면이 올라가는 건 아니라는 겁니다.

아이스커피의 얼음이 녹는다고 해서 커피가 흘러넘치는 건 아니죠. 

같은 원리입니다.

여기서 잠깐.

해수면 상승에 직접적인 영향을 주는 건 북극 바다 위 얼음인 '빙산'이 아니라 육지를 덮은 '빙하'입니다.

얼마 전 미국 알래스카에서 촬영된 영상입니다.

빙하가 녹아 호수 수위가 올라가면서 벌어진 일입니다. 

빙하가 녹는 속도, 심상치 않습니다.

알프스에서 오래 전에 실종된 등반가들의 유해가 해빙으로 인해 속속 발견될 정도니까요.

다시 북극 얘기로 돌아가겠습니다.

북극해 얼음은 북극곰뿐 아니라, 인간의 거주 환경과도 연관돼 있습니다.

가림막 역할을 하던 빙산이 녹으면 바람과 파도가 강해져 침식 현상이 증가하기 때문입니다.

극지방 얼음 연구원인 로비 말렛은 450만 명 정도가 침식에 심각한 영향을 받게 될 걸로 추정했습니다.

북극곰은 터전만 잃는 게 아닙니다.

DNA 변화로 지구상에서 아예 사라질 수 있습니다.

북극곰은 이리저리 이동하며 다른 계통의 북극곰과 짝짓기를 하며 유전적 다양성을 확보해 왔습니다.

이를 통해 기후변화에 적응하는 능력을 높이고 질병에 걸릴 위험을 낮추며 생존력을 키웠는데요,

얼음이 녹아 이동을 못 하게 되면서 동계교배, 즉 같은 종끼리의 짝짓기 가능성이 크게 높아졌습니다.

유전적 다양성이 줄어들면 생존력은 물론, 번식력도 떨어져 결국 멸종할 수 있습니다. 

미국 국립설빙데이터센터(NSIDC)에 따르면 2010년대 여름 빙산의 면적은 1980년대에 비해 40% 정도 감소했습니다.

부피로 따지면 70%나 줄었습니다.

지구는 과거에도 비슷한 일을 겪었습니다.

전문가들은 12만 년전의 '마지막 간빙기'를 주목합니다

스웨던 기후과학자들에 따르면, 현재 기후와 비슷했던 그때, 북극해 얼음은 모두 녹았습니다. 

다시 찾아온 간빙기.

같은 일이 되풀이되고 있습니다.

[데이비드 바버 / 캐나다 마니토바 대학 지구환경자원연구소장 : 가까운 미래에 북반구에서는 여름에 얼음이 없을 것입니다. 지구 시스템에서 일어난 정말 큰 변화입니다.]

그런데 해빙의 원인이 과거와 다릅니다.

태양이나 화산의 활동 같은 자연 요인보다는 온난화를 일으키는 온실가스가 북극의 얼음을 녹이는 주범으로 꼽힙니다.

머지않아, 북극의 한여름인 9월에 북극해 얼음이 모두 사라질 수 있다는 경고까지 나왔습니다.

포스텍과 캐나다 환경기후변화청, 독일 함부르크 대학의 공동 연구팀이 국제 학술지인 '네이처 커뮤니케이션즈'에 발표한 논문 내용인데요.

연구팀은 현재의 온실가스 배출량이 유지될 경우, 2030년대 9월에 얼음이 모두 녹아버릴 것으로 예측했습니다.

탄소 배출을 줄인다고해도 2050년대에 이르면  9월달 얼음이 소멸할 수 있다는 전망도 함께 내놨는데요.

'노력해도 안 되니 포기하자'는 뜻이 결코 아닙니다.

연구 결과에 담긴 의미는 암울하기보다 오히려 희망적입니다.

[민승기 / 포스텍 환경공학과 교수 : 온실가스 (배출을) 많이 줄이면 9월 이외의 다른 달들에는 해빙(얼음)이 남아 있는 것을 볼 수 있을 것이고, 그에 반해서 온실가스 배출을 지금처럼 계속 많이 증가시킬 경우에는 8월부터 10월까지, 2060년대에는, 세 달 동안 북극 해빙이 거의 없는 상태가 되는... 온실가스 저감을 했을 때의 영향, 효과, 우리가 찾을 수 있는 이득은 훨씬 더 있다라는 것을 말씀드리고 싶고요. 2050년대 이후에 탄소중립을 지나서 오히려 탄소를 대기 중에서 줄일 수 있는 시나리오로 간다면 북극 해빙이 9월에도 당연히 다시 나타날 것이고요.]

처음 운전대를 잡으면 고속도로 드나들 때 무지 겁납니다.

특히 고속도로에서 빠져나오는 게 여간 어려운 게 아닙니다.

어렵다고 직진만 할 수는 없겠죠.

'우리는 기후 지옥행 고속도로를 탔다'

안토니우 구테흐스 유엔사무총장의 말입니다.

기후변화의 속도를 늦추려면 지금이라도 적극적인 조치를 취해 지옥행 고속도로에서 빠져나와야 한다는 경고입니다.", 'https://www.youtube.com/watch?v=t7cofBEdt04', "'완전 소멸' 선고받은 지구…심상치 않은 징후 포착", 'NEWS');

CALL InsertScript("금융기관 3곳 이상에서 대출을 받은 다중채무자 수가 역대 최다를 기록했습니다.

한국은행이 양경숙 더불어민주당 의원에게 제출한 자료에 따르면 지난해 3분기 말 국내 가계대출 다중채무자는 450만 명으로 집계됐습니다.

직전 분기보다 2만 명 늘어나 역대 최다를 기록했는데, 전체 가계대출자에서 차지하는 비중도 22.7%로 사상 최대 수준입니다.

다중채무자의 평균 연체율은 지난해 3분기 말 현재 1.5%로 추산돼 2019년 3분기 이후 4년 만에 가장 높은 수준입니다.", "https://n.news.naver.com/mnews/article/422/0000644340?sid=292","지난해 3분기 다중채무자 450만명 '역대 최다'","NEWS");

select * from scripts;
CALL InsertScript("[앵커]

보이스피싱 등 금융사기범죄는 서민들에게 큰 상처를 남기는 심각한 민생범죄입니다.

수법도 하루가 다르게 교묘해지고 있습니다.

가족인 척 전화해 돈을 요구하고, 부고 메시지를 보내 개인 정보를 빼가기도 합니다.

이처럼 악랄해지는 금융사기에 맞서 기술적 시도도 함께, 진화하고 있습니다.

황정호 기자가 보도합니다.

[리포트]

딸의 번호로 걸려온 전화 한 통.

[보이스피싱 사기범/딸 사칭 : '지하 창고 같은 데 끌려왔어. 나보고 돈 내놓으래.']

딸을 사칭해 돈을 보내라고 요구한 금융사기단의 소행이었습니다.

[피해자 녹취/음성변조 : '떨렸어요. 딸 휴대전화에다가 딸 얼굴까지 나오는데 감쪽같이 속았고…']

이처럼 지인의 전화번호로 위급한 상황을 전하면 목소리를 정확히 구분하기 어려운데, 최근 AI를 활용해 지인의 목소리를 구별해내는 기술이 개발됐습니다.

지인 목소리의 특징을 AI에게 학습시키면, 통화 상대방이 지인인지 아닌지를 구별해내는 겁니다.

위급한 상황을 가정하고 다급한 목소리로 도움을 청해보겠습니다.

['나 큰일 났어! 여기로 돈 좀 빨리 보내줘, 빨리!']

다른 사람이 비슷한 톤으로 말해봤습니다.

['나 큰일 났어. 여기로 돈 좀 보내줘 빨리!']

AI가 바로 구분해냅니다.

[한영섭/LG유플러스 AI 기술담당 : '놀람, 화남 그런 감정에 대한 것들을 미리 학습을 시켜서 그런 변조된 것도 어느 정도는 본인 목소리를 확인할 수 있고요.']

문자 메시지에 포함된 인터넷 주소를 누르는 순간, 내 개인 정보가 탈취되는 이른바 스미싱 범죄.

최근 부고 등으로 위장한 스미싱 범죄가 늘고 있는데, AI를 활용하면 바로 확인할 수 있습니다.

AI가 악성코드가 있는 문자의 유형을 학습해 확인해주는 겁니다.

[최원혁/AI 업체 '누리랩' 대표 : '엉뚱한 인터넷 도메인 주소임에도 불구하고 그러한 유사 정보들을 가지고 있다고 판단하면 AI가 악성이라고 판단하게 되는 거죠.']

정부는 설 연휴를 맞아 민관합동으로 24시간 대응태세를 갖추는 등 보이스피싱 범죄에 대한 대응을 강화하기로 했습니다.","https://n.news.naver.com/mnews/article/056/0011658812?sid=308","“끌려왔어”·부고 문자…교묘해져도 잡는다!","NEWS");

CALL InsertScript('[앵커]

고속도로 휴게소는 밤에는 상주하는 인력이 없어 끼니를 해결하기가 쉽지 않습니다.

영동고속도로 문막휴게소에 요리하는 로봇이 처음 설치돼 신속한 조리는 물론 24시간 운영도 가능하게 됐습니다.

이상현 기자가 현장을 다녀왔습니다.

[기자]

무인 단말기로 먹고 싶은 음식을 주문합니다.

주방에서는 주문을 접수한 로봇이 잘 익은 면을 꺼내 그릇에 담습니다.

육수를 넣고 고명을 올리면 휴게소 대표 음식인 가락국수가 완성됩니다.

주문부터 배식까지 걸린 시간은 2분 남짓.

한국도로공사가 영동고속도로 인천 방향 문막휴게소에 도입한 로봇 셰프입니다.

<김동옥 / 로봇셰프 제조사 부장> "반복 작업 계속하면 정말 힘듭니다. 1시간 2시간 계속 반복 작업을 합니다. 기계가 도입됨으로써 여사님들의 근무 환경도 좋아지고…."

라면과 가락국수, 한식 3개 코너에 설치된 조리 로봇은 적게는 3종류에서 많게는 5종류의 요리가 가능합니다.

정해진 조리법에 따라 로봇이 정확하게 계량을 해 요리하기 때문에 언제, 누가 주문해도 같은 품질의 음식을 제공할 수 있습니다.

음식을 맛본 이용객들도 엄지손가락을 치켜세웁니다.

<김기수 / 충남 아산시> "셰프님이 만들어주신 그런 것과 별 차이 없이 진짜 맛있어요. 국물도 시원하고 간도 맞고 고기도 연하고 진짜 맛있어요."

기존의 휴게소보다 가격이 20% 정도 저렴해 이용객들의 부담을 덜었습니다.

<유연희 / 충남 아산시> "요즘 1인 1메뉴 추천이고 어려도 메뉴는 다 줘야 하고 가격은 다 내야 하는데 저렴하게 먹을 수 있잖아요."

야간에도 사람 없이 조리할 수 있어 24시간 무인 휴게소 운영도 가능해졌습니다.

<함진규 / 한국도로공사 사장> "사람이 24시간 하기 곤란한 건 제한적으로 로봇을 활용하는 게 4차 산업혁명 격변기에 맞는 일이 아닌가 생각합니다."

한국도로공사는 이번 설 연휴 기간 이곳을 방문한 운전자들의 평가를 보고 확대 여부를 검토할 계획입니다.',"https://n.news.naver.com/mnews/article/422/0000644343?sid=291",'"로봇이 음식 만듭니다"…24시간 여는 자동화 고속도로 휴게소',"NEWS");

CALL InsertScript("<앵커>

요즘 공인 중개사 없이 온라인이나 애플리케이션으로 집을 직접 사고파는 부동산 직거래가 활발해지고 있습니다. 편한 점이 많아서 그런 것이지만, 주의할 점도 많습니다.

제희원 기자가 짚어 드립니다.

<기자>

직장인 이진욱 씨는 결혼 전 혼자 산 아파트를 중고거래 앱에 매물로 내놨습니다.

이미 석 달 전 동네 부동산에 집을 내놨지만 문의가 없었기 때문입니다.

[이진욱/부동산 직거래 이용자 : 작년 12월쯤에 (집을) 내놨는데 12월 내내 거의 문의가 없었어요. 온라인으로도 내놓으면 아무래도 더 많은 사람들이 보게 되니까….]

수백만 원에 달하는 중개 수수료도 부담이 됐습니다.

[이진욱/부동산 직거래 이용자 : 매매 건당 몇백만 원씩 내야 되는 거기 때문에 저 같은 경우에는 한 200만 원 이상 아낄 수 있다고 들어서….]

과거 원룸과 오피스텔 위주로 이뤄지던 부동산 직거래가 이제는 아파트 전세와 매매 시장까지 확산하는 추세입니다.

[서울 구로구 공인중개사 : 6억 5천에 거래된 건 부동산에서 한 게 아니고 아마 개인끼리 한 걸 거예요.]

지난해 전국 아파트 매매 37만 3천여 건 가운데 11% 정도가 직거래였습니다.

하지만 향후 법적 분쟁 시 당사자가 책임져야 하기 때문에 계약 전 등기부등본을 떼 가압류와 전세권 등 근저당권 설정 여부를 면밀하게 파악해야 합니다.

[여경희/부동산R114 연구원 : 권리 분석, 하자 부분을 직접 다 확인해야 한다는 부담이 크기 때문에 충분히 서류를 갖추고 나와서 계약을 하는지 물리적 하자가 어떤 것들이 있는지 꼼꼼하게 살펴볼 필요가 있다고 봅니다.]

향후 분쟁 가능성이 높은 하자와 관련해서는 중개사의 대상물확인설명서가 없는 만큼, 거래 당사자가 채광상태와 누수, 소음 등을 확인해 서류로 작성해 두는 것이 좋습니다.
","https://n.news.naver.com/mnews/article/055/0001130047?sid=292",'중고거래 앱에 "아파트 팔아요"…"계약 전 등기 확인 꼭"',"NEWS");

call insertScript("지난 1998년 운영을 시작한 국제 우주정거장이 오는 2030년이면 문을 닫게 됩니다.

임무 수명인 20년을 훌쩍 넘기고도 기간을 연장해 왔지만, 노후화로 인해 이제는 퇴거가 불가피한 상황입니다.

차기 우주정거장 설치를 위한 경쟁도 치열해지는 상황.

중국은 이미 독자적인 우주정거장, 톈궁을 건설했고 미국과 러시아도 기술 개발에 박차를 가하고 있습니다.

최근에는 블루오리진과 손잡고 우주정거장을 개발 중인 미국 민간기업 시에라스페이스가 우주로 보낼 구조물의 본격적인 시험에 들어갔습니다.

이들이 만든 건 우주정거장의 핵심 주거 시설로, 마치 풍선과 같은 방식의 팽창식 모듈입니다.

섬유로 만들어져 접을 수 있지만, 부풀리면 건물 3층 높이에 지름은 8.3m에 달하는 거대한 공간이 됩니다.

보통 우주 정거장을 건설하려면 40번 넘게 지구를 오가며 부품을 조립해야 하는데 이를 이용하면 왕복 횟수가 3분의 1 이하로 줄어듭니다.

또 내열 소재로 코팅된 섬유는 녹는점이 340℃에 달해 열에 강하고 자외선 차단 기능도 있어 우주인을 보호할 수 있습니다.

연구팀은 이 구조물이 우주 압력에 견딜 수 있는지 시제품으로 시험한 결과, 나사가 정한 안전 기준을 27%가량 초과해서 만족했다고 설명했습니다.

[리앤 톰슨 / 시에라스페이스 시스템 엔지니어 : 나사가 정한 안전 기준을 통과했지만 모듈이 터지지 않았습니다. 우리는 시제품이 폭발할 때까지 얼마나 더 큰 압력을 견딜 수 있는지 보기 위해 다시 시험했습니다.]

시에라스페이스는 팽창식 모듈을 중심으로 민간 우주정거장인 '오비탈 리프'를 2030년 이전에 건설한다는 계획입니다.

기존 우주정거장과 같이 우주인의 생활을 돕는 것은 물론 연구 시설과 물류 운송 시스템 등을 갖춘 '다용도 편의 시설'을 만든다는 것인데, 민간 우주정거장의 새로운 출발점이 될지 주목됩니다.",'https://n.news.naver.com/mnews/article/052/0001994303?sid=308',"[자막뉴스] 펼치기만 하면 '끝'...우주 탐험, 새로운 지평 열렸다",'NEWS');

call InsertScript('<앵커>

공연하는 곳마다 그 지역 경제가 살아날 정도로 세계적 인기를 끌고 있는 미국의 팝스타 테일러 스위프트가 그래미 시상식에서 새 역사를 썼습니다. 최고상으로 여겨지는 올해의 앨범 트로피를 네 차례 거머쥔 최초의 가수가 됐습니다.

장선이 기자가 전하겠습니다.

<기자>

시상자로 나선 팝스타 셀린 디온이 그래미어워즈 최고상인 "올해의 앨범상" 주인공을 호명합니다.

[셀린 디온 : 올해의 수상자는 "테일러 스위프트".]

테일러 스위프트가 정규 10집 "미드나이츠"로 올해의 앨범상을 수상한 것입니다.

이번 수상으로 스위프트는 역대 최초로 그래미어워즈 올해의 앨범 부문에서 4번 수상하는 신기록을 세웠습니다.

같은 부문에서 이 상을 3차례 받았던 프랭크 시나트라, 스티비 원더, 폴 사이먼의 기록을 뛰어넘었습니다.

[테일러 스위프트 : 지금이 제 인생의 최고의 순간입니다. 이 상을 통해 앞으로도 계속 작업을 이어나갈 수 있어서 너무 좋고 행복합니다.]

올해 시상식에서는 여성 가수들의 활약이 두드러졌습니다.

올해의 앨범과 올해의 노래, 올해의 레코드, 신인상 등 4개 주요 부문을 여성 가수들이 싹쓸이했습니다.

주요 부문 시상자도 여성들이 나섰는데, 셀린 디온은 온몸이 굳어가는 "강직인간 증후군"을 앓고 있는 상황에서도 무대에 올라 박수갈채를 받았습니다.

로이터통신은 "스위프트가 그래미 역사를 썼고, 여성들이 음악계를 지배했다"고 보도했습니다.

올해 시상식에는 우리나라 가수는 후보에 오르지 못해 아쉬움을 남겼습니다.

앞서 방탄소년단은 지난 회까지 3년 연속으로 베스트 팝 듀오 그룹 퍼포먼스 부문 후보로 지명된 바 있습니다.

지난해 월드 투어 콘서트로 수조 원의 경제적 효과를 유발해 "스위프트노믹스"라는 신조어까지 탄생시켰던 스위프트가 내딛는 한 걸음 한 걸음이 팝의 새 역사가 되고 있습니다.', "https://n.news.naver.com/mnews/article/055/0001128571?sid=290","그래미 최고상 4번째로 거머쥐었다…스위프트 '새 역사'","NEWS");


call InsertScript("존경하는 국민 여러분,

그리고 김재철 무역협회장을 비롯한 기업과 무역 관계자 여러분!

금세기 마지막「무역의 날」을 맞아 수출한국의 신화를 이어가고 있는 여러분의 노고에 진심으로 경의를 표하며, 깊은 감사를 드립니다.

아울러 오늘 수출증대에 기여한 공로로 영예로운 상을 받으신 수출유공자 여러분께 축하의 말씀을 드립니다. 이 상은 국민과 정부가 여러분께 드리는 감사와 격려의 표시입니다.

불과 2년전, 우리는 외환위기라는 가혹한 시련을 겪어야 했습니다. 국가는 파산직전이었고, 근로자를 비롯한 국민은 실업과 소득감소로 큰 고통을 당해야 했습니다.

하지만 우리는 외환위기에 빠진 나라경제를 건져냈습니다. 우리경제는 전세계가 놀랄만큼 빠른 속도로 회복되고 있습니다.

취임 초 제가 1년반안에 외환위기를 이겨내겠다고 약속했을 때, 이를 믿는 사람은 국내외를 막론하고 거의 없었습니다. 하지만 우리는 해냈습니다. 바로 고난과 역경을 두려워 하지 않는 우리 국민의 강인한 저력과 정부의 적극적 노력 그리고 무역인 여러분을 포함한 우리 경제인들의 헌신 덕택으로 이겨낸 것입니다.

97년말 38억 달러에 불과했던 외환보유액이 이제는 6백80억달러를 넘어섰고, 무역수지도 작년에 이어 2년 연속 큰 폭의 흑자를 기록하고 있습니다. 외국인투자는 사상 최초로 100억달러를 넘었습니다.

금년 2월 178만명에 이르렀던 실업자수도 지금은 102만명으로 줄었으며, 지난해 마이너스 5.8%를 기록했던 경제성장률은 올해 9%대에 이를 전망입니다. 금리와 환율도 안정되었고 물가는 1%대에서 유지되고 있습니다.

이러한 경제여건의 호전으로 세계적인 신용평가기관들을 비롯한 국제사회의 우리경제에 대한 평가도 크게 달라졌습니다.

특히 지난해 390억달러라는 사상최대의 무역수지 흑자를 이루고, 올해도 급증하는 수입에도 불구하고 200억달러 이상의 흑자를 올림으로써 우리경제의 회생을 앞당기게 된 것은 바로 무역인 여러분의 기여가 컸기 때문입니다.

다시한번 경제회생의 일등공신인 무역인 여러분들께 감사드립니다.

무역인 여러분!

이제 21세기가 눈앞에 다가와 있습니다. 불과 한달 후면 새로운 천년이 시작됩니다.

20세기에는 자본과 노동, 토지와 같은 눈에 보이는 물적요소가 경제를 좌우하던 시대였다면, 다가오는 21세기와 새천년은 눈에 보이지 않는 지식과 정보, 문화창조력이 경제와 국운를 결정하는 시대가 될 것입니다.

우리는 이처럼 인류 역사상 유례가 없는 혁명적 변화속에서 세계와 무한경쟁을 벌여나가야 합니다.

이러한 시점에서 우리 무역계 역시 새마음, 새기운으로 각오를 새롭게 하고 시대변화에 부응하는 전략을 마련해야 합니다.

그래서 저는 오늘 이 자리를 빌려 여러분과 함께 21세기 우리 무역이 나아가야 할 방향에 대해 몇 말씀하고자 합니다.

첫째, 전자상거래를 포함한「사이버 무역」에 철저히 대비하고 이 분야에서 경쟁력을 갖춰야 합니다.

전세계가 인터넷을 기반으로 한 초고속 정보화사회로 진입하면서 앞으로 5년안에 세계무역의 30%는 사이버무역으로 변화할 것이라고 합니다. 또 인터넷과 연결되지 않은 기업은 5년안에 도태될 것이라고도 합니다.

기존의 까다롭고 복잡한 무역절차나 서류 대신에 컴퓨터 마우스를 한두번 클릭함으로써 손쉽게 무역이 이루어지는 사이버 무역시대가 열리고 있는 것입니다. 어느 나라보다 무역의존도가 높은 우리나라로서는 철저한 준비와 대응이 필요합니다.

국민의 정부는 사이버 무역의 중요성을 인식하고 사이버 무역을 위한 법제도 정비, 인프라스트럭쳐 구축, 전문인력 양성, 사이버 실크로드 개최 등 다각적인 시책을 마련하여 최대한 지원토록 하겠습니다.

우리 기업들도 사이버무역에 대한 적극적인 투자와 준비로 전세계 구석구석을 우리의 수출시장으로 만드는 적극적인 시장개척과 마케팅 노력을 다해주길 당부드립니다.

둘째는 한편으로는 치열하게 경쟁하지만 다른 한편으로는 공존공영을 위한 협력을 모색하는 21세기의 세계시장에 적극적으로 대응해야 할 것입니다.

우선은 세계에 뒤쳐지지 않을 수출경쟁력을 확보하는 일입니다.

세계시장에서는 절대강자도, 영원한 패자도 없습니다. 오로지 보다 싸고, 보다 우수한 새로운 제품, 새로운 기술 그리고 새로운 서비스만이 성공을 보장할 것입니다.

과감한 기업구조개혁으로 핵심역량을 결집하여 기술과 품질로 승부하는, 그래서 제 값 받고 외국에 판매하는 수출경영체제가 구축되어야 하겠습니다.

양에 치중하고 대외적인 여건변화에 취약하며 핵심 부품의 수입의존도가 높고 수출확대가 오히려 수입증가를 유발하는 현재의 수출입구조를 이제는 내실있고 건전한 체제로 하루속히 전환해야 합니다.

이를 위해 기술력있는 중소, 벤처기업과 부품, 소재산업을 적극 육성하고 기술개발 투자를 확대하는 한편 효율적인 산, 학, 연 삼자협력체제를 강화해야 겠습니다.

무역투자진흥공사(KOTRA)도 중소기업 수출을 전담지원하는 수출첨병으로 그 기능을 다할 수 있도록 할 것이며, 해외무역관을 수출기지화하여 현장중심 체제로 운영토록 하겠습니다.

경쟁과 협력의 시대에 성공하기 위해서는 외국기업과의 협력을 통해서도 경쟁력을 높일 수 있어야 합니다.

오늘 금탑산업훈장 수상자 가운데 외국기업 대표가 계신 것처럼 우리나라에 들어와 있는 외국기업 역시 우리 경제에 크게 기여하고 있다는 사실을 올바르게 인식해야 합니다.

우리 기업들도 외국인투자를 적극 유치하여 선진기술과 경영기법을 도입하고, 때로는 경쟁상대와 전략적 제휴를 통해 Win-Win 게임을 하는 방식에 익숙해져야 합니다.

우리도 이제는 다자간 세계경제질서 형성에 적극 참여하여 경쟁과 협력의 시대에 뒤쳐지지 말아야 합니다.

지금 이 순간 미국 시애틀에서는 새로운 세계경제규범 마련을 위한 세계무역기구(WTO) 각료회의가 열리고 있습니다. 특히 뉴라운드의 출범은 서비스, 농산물, 전자상거래 등의 분야에서 우리 경제와 무역에 큰 영향을 미칠 것입니다.

우리는 뉴라운드에 적극 참여하여 한편으로는 우리의 통상이익이 최대한 반영되도록 하는 동시에 다른 한편으로는 자유무역질서가 보다 확산될 수 있도록 할 것입니다.

단기투기자금의 폐해를 예방하는 개혁방안 마련을 포함하여 비슷한 처지에 있는 국가들과의 밀접한 공조를 바탕으로 보다 다른 세계경제질서 형성에 당당하게 참여할 것입니다.

우리 무역이 나아갈 세 번째 방향은 고부가가치 지식집약형 상품수출에 힘을 기울이는 것입니다.

앞에서 말씀했다시피 21세기는 지식, 정보, 문화창조력과 같은 소프트웨어가 더 높은 부가가치를 창출하는 지식기반경제의 시대가 될 것입니다.

우리 민족은 세계에서 가장 높은 교육열과 문화창조력을 갖춘 능력있는 민족입니다. 그러므로 다가오는 새천년은 우리에게 커다란 기회가 될 수 있습니다.

전통적인 제조업 중심의 수출상품에만 집착하지 말고 인터넷 정보기술산업, 소프트웨어(S/W)산업, 디자인 산업, 문화관광산업 등 고부가가치 지식집약형 산업에 눈을 돌려야 할 때입니다.

또한 현재의 수출상품도 저부가가치의 물량위주 수출을 지양하고 지속적인 기술개발, 품질 향상, 디자인 개선으로 높은 부가가치를 창출하는 상품으로 변화시켜야 합니다.

예를 들자면 사양산업이라는 신발, 섬유산업도 얼마든지 고부가가치 상품으로 만들어 우리의 수출산업으로 키울 수 있습니다. 해외 소비자 기호에 맞는 질 좋고 디자인 좋은 신발과 옷을 만들어야 합니다.

친애하는 기업인 그리고 무역 관계자 여러분!

우리는 6.25의 폐허위에서 무역입국의 기치아래 고도성장을 이루어낸 바 있습니다. 국가파산의 위기를 전화위복의 계기로 만든 저력을 지니고 있습니다.

저는 사상최대의 경제위기속에서 사상 최고의 무역흑자를 일구어낸 여러분의 의지와 능력을 믿고 또 기대하고 있습니다.

그러나 우리는 결코 현재에 만족할 수 없습니다. 이제 겨우 새로운 도약의 틀을 마련한 것입니다. 60년대 이후 수출로 경제성장의 터전을 일구었듯이, 이제 국가경제의 재도약과 힘찬 전진을 무역이 선도하겠다는 결의를 새롭게 다집시다.

무역은 우리경제가 세계 일류경제로 나아가기 위한 가장 중요한 견인차입니다. 저물어 가는 20세기 마지막 날까지 수출확대에 최선을 다해주기 바라며, 21세기에는 더 큰 성공을 거두어 주시기 바랍니다.

다시한번 이 나라를 세계적 경영 강국으로 이끌어가고자 애쓰신 무역인 여러분의 노고에 감사드리며, 여러분 모두에게 발전과 행운이 함께 하기를 진심으로 기원합니다.

감사합니다.", null, "제36회 무역의 날 기념식 연설(무역은 세계 일류경제로 나아가는 견인차)", "SPEECH");


call InsertScript("존경하고 사랑하는 국민 여러분!

새천년 21세기의 새해가 밝았습니다. 이 뜻깊은 새아침을 맞아 국민 여러분의 건승과 행복을 기원합니다. 북한을 비롯하여 온 지구촌에 살고 있는 7천5백만 우리 동포들에게도 큰 축복이 있기를 바라마지 않습니다.

우리는 오늘 큰 꿈과 희망을 안고 새로운 출발점에 섰습니다. 세계일류국가를 향한 도약으로 우리 겨레는 물론, 인류의 평화와 번영에 기여하기 위한 출발입니다.

우리는 이러한 꿈과 희망을 이루어 갈 충분한 저력을 갖고 있습니다. 독재로 황폐화된 이 땅에 민주주의를 꽃피우고 파산위기에 처한 경제를 다시 살려낸 우리들입니다. 북한과의 화해를 열망하면서 전세계의 지지 속에 포용정책을 추진하고 있는 우리이기도 합니다.

지식기반시대인 21세기가 요구하는 조건들을 우리 한국인은 누구보다도 잘 갖추고 있습니다. 높은 지적 수준과 문화적 창의력이 그것입니다. 더욱이 지정학적으로는 미국 일본 중국 러시아 등의 큰 시장으로 둘러싸여 있습니다. 21세기는 우리에게 주어진 기회요 축복인 것입니다.

오늘의 우리들에게 필요한 것은 도전정신입니다. 금모으기에 나섰던 그 기백으로 새천년의 미래를 향해 힘차게 나아가는 용기인 것입니다. 21세기를 반드시 한민족의 위대한 시대로 만들어야 합니다.

시작이 반이라 했습니다. 올해 우리들이 어떻게 시작하느냐에 21세기 우리의 미래가 달려 있습니다. 그래서 저는 새천년 새희망을 다짐하는 올해의 국정지표로 다음과 같은 다섯가지를 마련했습니다.

첫째는 국민화합의 구현입니다. 둘째는 국정개혁의 완수입니다. 셋째는 신지식인사회의 실현입니다. 넷째는 세계일류경제의 지향입니다. 그리고 다섯째는 남북협력의 촉진입니다.

저는 올해 이 다섯 가지 국정과제의 실현에 모든 역량을 집중할 것입니다. 그것이 곧 21세기를 우리들의 세기로 만드는 최선의 길이라 믿습니다. 올해는 특히 무엇보다도 중산층과 서민의 복지향상에 최우선의 노력을 기울이겠습니다.

존경하고 사랑하는 국민 여러분!

이제 우리는 고난의 20세기를 넘어 희망의 21세기에 들어섰습니다. 영광된 미래가 우리 앞에 열리고 있습니다.

우리에게는 꿈도 희망도 분명합니다. 그리고 이를 이루기 위해 풀어가야 할 국가적 과제도 분명해졌습니다. 더 이상 주저하고 망설일 것이 없습니다. 어제의 갈등과 대립에서 벗어나 화합과 희망 국민대장정의 대열에 모두 동참합시다.

새천년 새희망의 벅찬 감격을 여러분과 함께 나누고자 합니다.

국민 여러분 새해 복 많이 받으십시오.", null,"2000년 신년 메시지(화합과 희망의 대열에 동참합시다)","SPEECH");

call InsertScript("한국 투자 유치를 위한 국제 경제 회의를 주최하여 주신 영국 파이낸셜타임즈 감사드립니다. 아울러 오늘 회의 의장을 맡고 계신 파이낸셜타임즈의 피터 마딘 편집국장과 한국경제의 발전 가능성을 믿고 이 회의에 참석해주신 분들께 감사를 드립니다. 신사숙녀 여러분 지난 4월초 미국 의회에서 IMF 추가출연문제가 쟁점으로 떠올랐을 때 미 의회 의원들 입에서 IMF 지원과 관련하여 새로운 조건을 거론하는 분위기가 있었습니다. 그 새로운 조건이란 바로 인권과 민주주의에 대한 새로운 기준을 경험하는 것이었습니다. 다시 말해 민주적 개혁과 경제성장과의 성장관계로서 정치개혁과 경제개혁이 연계되어야 한다는 점을 주장한 것 입니다.

나는 이런 변화가 민주주의와 경제의 변형발전이라는 나의 주장과 그 맥을 같이하는 것에 대해 기쁘게 생각합니다.

나는 경제 원칙으로서 민주주의와 변형발전이 한국의 위기 나아가 아시아의 위기를 극복하는데 필수불가결한 것이라는 것을 다시 한 번 강조하고 싶습니다.



사실 나는 경제성장을 위해서는 민주주의의 완성을 미룰 수 있다는 아시아적 가치를 인정하지 않았습니다. 우리 한국 뿐 아니라 아시아 각국이 겪고 있는 경제적 어려움이 그런 나의 주장이 옳았음을 입증해주고 있다고 생각합니다.

그동안 눈부신 고도성장을 일으켜온 한국은 개발도상국들에게 모범으로 생각하였습니다. 정치와 이에 근거하는 경제적 발전을 추구한 압축성장이 그것이었습니다. 이러한 성장위주의 낙후된 경제 상황에서 방치되어 있었던 노동력과 자본업, 급속한 공업화에 그동안의 성장 전략은 결국 정경유착과 관치금융으로 하여금 나라와 경제를 지배하였으며 부정부패가 사회 곳곳에 뿌리 깊게... 이러한 과정에서 경쟁하는 이유는 경제의 질적 고도화와... 한국 경제는 마침내 비현실성과... 스스로 드러낼 수밖에 없었던 것입니다.



국민적 감시와 경제운영의 투명성이 보장될 때만 건전하게 발전해 나갈 수 있습니다. 나는 우리 한국에게 아시아의 새로운 모험을 창출해야할 의무가 있다고 생각합니다. 지난 ASEM회의에서 나의 민주주의와 발전이라는 발언에 각국의 정상들이 많은 지지를 보내주신 이유도 거기에 있다고 생각하고 있습니다.



결코 분리할 수 없는 것 입니다. 자유롭고 건강한 기반으로 하는 경제, 시민이 함께하는 경제, 국산품이건 외국상품이건 값싸고 질 좋은 상품이 차별 없이 환영받는 경제, 노력한 만큼 불필요한 간섭을 철폐해야 할 때에만 가능한 것입니다.



이런 내외국인의 경제활동이 경제를 촉진하고 차별을 없애는 과정이라고 할 것입니다. 시장경제가 제대로 작동하기 위해서는 정치적 민주화가 필수적입니다.

만일 민주주의가 행해졌다면 정경유착, 관치금융, 성장위주의 경제. 부동산투기가 행해질 수 없었을 것입니다. 한국에서 50여년 만에 처음으로 여야 간의 정권교체를 통해 탄생한 정부가 들어섬으로서 민주주의와 시장경제의 병행발전을 할 수 있을 것입니다.

신사숙녀 여러분, 4월초 영국 런던에서 개최된 제1차 ASEM회의는 여러모로 나와 우리 한국에 유익한 회의였습니다. 나는 그 회의를 통해 국제사회가 한국이 외환위기에 잘 대처해왔을 뿐 아니라 한국이 다시 일어설 수 있다는 공통된 생각을 갖고 있음을 확인할 수 있었습니다.

나는 그 회의에서 아시아위기에 대해 역할을 강조하면서 ASEM의 아시아국가에 대한 자원지원, 투자를 제안했으며 영국, 프랑스, 독일, 이탈리아 일본 등 여러 나라 정상들에게 개별적으로 협력을 구했습니다.

그 결과 ASEM은 아시아 각국과 우리 한국에 대한 투자를 하게 되었습니다.



사실 한국을 위한 투자 교역원 파견 결정은 ASEM회의의 유일한 구체적 성과라 할 수 있습니다. 그런 결정은 우리 한국이 추구하고 있는 개혁과정에 대한 동의표시이자 민주주의와 시장경제의 병행 발전이란 한국의 발전 전략에 대한 격려 의사 표시라고 생각합니다.

나는 런던 시장 ...에서 영국의 세계적인 금융 개별국과 만나 한국 경제를 포함한 경제 전반에 대해서 매우 유익한 오찬 모임을 가졌습니다.

그리고 영국 경제인 연합회에서 수백 명의 경제계 인사들에게 연설하고 토론도 했습니다.  

그런 한국에게 대단히 큰 관심을 표현했으며 ASEM회의에 참석했던 정상들과 마찬가지로 한국에 대한 성원과 투자이유를 밝힌바 있습니다.

그들은 한국의 우수한 인적 자원에 대해 높은 평가를 하고 있었습니다. 그러나 한편으로는 그들은 두 가지 문제에 대해서 우려를 표시했습니다. 하나는 노사정 합의대로 노동시장의 유연성과 기업이 개혁이 잘 행 해질 수 있을까 하는 점과 다른 하나는 한국의 ... 경쟁이 튼튼히 이루어 질것인가에 대한 것이었습니다.

나는 이 자리를 빌려 이 두 가지 문제에 대해서 설명을 드리고자 합니다.



신사숙녀 여러분, 우선 노사정합의의 실천이유에 대해 말씀드리겠습니다. 노사정합의는 무엇보다도 이미 추진되었던 근로 위원회나 지금 진행되고 있는 실업기금 모금 운동과 같이  한국국민이 강한 애국심에 바탕을 두고 있습니다. 우리 국민은 이번 위기를 전화위복의 계기로 삼아 나라를 다시 일으키고 말겠다는 강력한 결의에 차있습니다.

이런 결의가 노사정합의의 실천을 튼튼하게 뒷받침 하고 있는 것입니다. 이와 같은 한국의 노동자, 사용자 그리고 정부는 지난 2월 위한 고통분담과 구제를 위한 개혁을 단행하는데  합의를 했습니다.  선진외국과는 달리 노사 협력 주의의 역사가 있지 않는 한국에서는 기적 같은 일이 아닐 수 없었습니다.

국민적 지지에 바탕을 둔 노사정합의는 반드시 지켜질 것입니다. 실제 노사정합의로 만들어진 사회적 협약 90개 사항 중 결합 재무제표 작성 의무화를 위한 법 개정이나 사외 이사회도입 등 경영 주변성 강화를 위한 합의사항 체결이 완료되었으며 5억으로 합의된 실업대책기금도 이를 초과하여 7조 9천억 원을 마련하는 등 도합 19개 항목이 완료되었습니다. 나머지 합의사항도 추진 중에 있습니다. 나아가 제2기 노사정위원회도 지난3월에 마련된 법적 근거에 따라 지금 추렴기관 작업이 진행되고 있습니다.

제2기 노사정 회의는 1기 노사정 합의사항에 대한 이행을 점검하고 기업의 구조조정과 취업추진과정에서 예상 되는 문제점의 해결방안을 마련할 것입니다.

외국 언론이나 외국의 시각을 보면 한국의 노동운동이 강렬한 것으로 인식되고 있는 것 같습니다. 그러나 그동안 노동운동을 강력으로 몰아간 원인중 하나가 과거 역대정권이 노조에 대한 탄압과 기업에 대한 편애에 치중한 것도 원인이 있었습니다.

국민정부는 분명히 다릅니다. 노조 지도부들도 현 정부는 대화와 토론이 가능한 상대로 여기고 있습니다. 나는 충분히 함께 살 수 있는 지혜로운 방안을 협의할 수 있다고 믿고 있습니다. 그러나 합의된 사항은 반드시 지켜져야 하고 ... 경중 돼야 합니다. 이점에 대한 정부 의 계획은 확고하다는 것을 여러분께 말씀드리고 싶습니다.



한편, 지금 한국의 기업들은 노 사 정 간에 합의된 5개항 즉 기업의 투명성, 상호의 지속적인 합의, 기업 재정의 건실함. 핵심기업 선정과 중소기업 지원 그리고 기업 경영에 대한 책임제도 등을 새로 개정된 법에 의해서 이행 중입니다. 기업의 개혁만이 한국 경제가 재도약하는 길입니다. 이는 반듯이 실천될 것입니다.

다음으로 정국불안 문제에 대해 말씀드리겠습니다. 나는 지금 한국에서 돌고 있는 정국불안요소들의 극복이 가능하도고 말씀드리고 싶습니다.

정부관계는 국민의 절대적인 권한입니다. 국민의 다수가 정계 개편을 해서라도 정국 안정을 실현하여 오늘날의 국난을 극복하라고 요구하고 있습니다. 나는 야당이 이러한 국민 여망을 무시하지 않을 것으로 믿습니다. 나는 누차 야당에 대해서 요구하고 있습니다. 야당은 오늘의 국난 타계에 협조해야 한다. 더구나 당면한 경제위기는 오늘의 야당이 집권했을 때의 실천해서 결의된 것이다. 책임상으로라도 도와줘야 된다고 주장하고 있습니다. 나는 서울에서 선출된 야당의 지도부가 새로운 결단을 내릴 거라고 기다리고 주시하고 있습니다. 나는 한국정치가 머지않아서 튼튼한 안전한 방향으로 나아갈 것으로 믿습니다. 한국 정치의 안녕을 담보한 가장 확실한 요소는 한국 국민의 70~80%가 한국정부의 노력을 지지한다는 여론 조사가 계속 나오고 있다는 사실입니다.



존경하는 신사숙녀 여러분 ,나는 지금이 한국에 대한 여러분들의 투자가 시작되거나 확보 돼야 할 적기라고 생각합니다. 한국입장에서 외국인투자를 유치하는 일이야 말로 수출 ... 경제회생에 핵심적 사항이라 할 수 있습니다. 외국인 투자가 활성화 되면 부채 상환이나 이자 부담 없이 외환이 유입되며 환율안정에 기여하고 금리도 안정이 될 수 있습니다. 금리가 안정되면 투자도 살아나고 경제도 회복되어 실업도 줄어듭니다. 사실 오늘 이 자리도 대통령으로서 투자자들의 우려를 해소하고 격려하는 적극적인 노력의 일환이라고 할 수가 있습니다.



나와 정부는 외국인 투자 확산을 위해 많은 노력을 해왔습니다. 제가 취임한지 이제 겨우 2달됐습니다. 세계 어느 나라를 보더라도 이렇게 빠른 속도로 투자자유화를 위한 조치를 무리 없이 추진한 사례도 드물지 않은가 생각됩니다. 외국의 보도에 의하면 이러한 한국의 노력은 세계 각국으로부터 인정받기 시작하고 있습니다. 한국 정부는 외국인의 주식투자 환경을 확대하고 채권 시장도 개방했습니다. 또한 외국인의 이러한 M&A를 환영하고 있습니다. 또 외국인이 국내 기업의 기존 주식을 1/3 미만으로 취득할 경우에는 ...필요가 없도록 법문을 개정한바 있습니다. 그러나 우리는 더 나아가서 이에 만족치 않고 금년 상반기 중에 기업에 대한 공격적 M&A도 전면적으로 허용할 것입니다. 지금 우리 한국의 입장에서도 새로운 도전의 시기이지만 한국 경제의 회생 나아가 발전 ... 기대를 걸고 있는 투자의 여건을 탐색 중에 있는 외국인 투자가들에게도 좋은 기회라고 생각 합니다. 한국과 외국 투자자들의 쌍방의 이익을 위해서 이를 적극적으로 외국인 투자자들이 인센티브를 주고 투자에 나서야 할 때라고 생각합니다.  우리 한국의 가장 큰 자랑 중에 하나가 바로 우수한 인적 자원입니다. 한국이 가진 양질의 노동력에 외국인 투자가들의 자본과 선진 경영 비법이 배합되면 세계 어느 곳보다도 투자 효과를 극대화 할 수 있을 것이라고 확신하고 있습니다. 나는 외국인 투자가 한국의 기업구조 조정이나, 금융 개혁의 견인차 역할을 할 수 있으리라 생각됩니다. 기업이 적극적인 인수합병의 투자가 크게 이루어지길 바랍니다. 외국인 투자자 여러분들의 한국에 대한 투자는 여러분의 이익을 크게 실현시킬 뿐 아니라 한국경제위기 극복에 크게 기여하게 될 것입니다. 나아가 아시아 각국의 경제위기의 해결에 큰 교훈과 자극을 주게 될 것입니다.

친애하는 신사숙녀 여러분 한국경제를 철저한 시장 원리를 경제로 정착시킬 것입니다. 세계 모든 나라들과 격려하고 협력하면서 상호 이익과 공동번영을 추구하는 그런 경제체제를 반드시 만들 것입니다. 한국 정부는 국제적인 시장경제 체제 확립에 국가의 장래를 걸고 있습니다. 수출과 수입 그리고 외국인 투자 등 모든 국제적인 경제 관계에서 한국을 가장 기업하기 좋은 나라로 만들겠다는 것이 저의 확고한 결의입니다.



국내기업과 외국기업간의 어떠한 차별도 두지 않을 것입니다. 나는 민주주의와 시장 경제 병행 발전에 입각한 성장모델이 아시아의 ... 되기를 바랍니다. 오늘 이 자리에 외국투자가, 투자희망자, 그리고 외국 언론인들이 오신 것으로 알고 있습니다. 여러분들 스스로 지금까지 한국의 개혁노력과 결심을 잘 지켜보았으리라 생각합니다.

우리의 개혁 의지는 확고합니다. 그리고 나는 개혁을 반드시 성공시킬 것입니다. 이를 위해서 여러분의 아낌없는 협력이 절대로 필요합니다. 여러분께 더 한층 협력을 바라마지않습니다. 그리하여 한국의 경제를 재도약시키고 아시아에서도 민주주의와 시장경제가 결합만하면 경제발전의 진정한 성공이 있다는 진리를 우리 다 같이 증명해보입시다.


여러분의 행운을 빕니다. 감사합니다.","https://dams.pa.go.kr/dams/PUBLICATION/2017/11/09/DOC/SRC/0204201711091117040182961011502.mp4","파이낸셜 타임스지 주최 서울 경제국제회의 연설","SPEECH");



call InsertScript("감사와 격려의 말씀을 드리고자 합니다. 이 고속도로 건설은 포항, 대구 지역주민의 오랜 숙원사업이었고 지난 대통령 선거 때 제가 공약한 사업으로써 오늘 이 자리의 감회가 더욱 큽니다.

이 고속도로는 구미로 부터 대구를 통하여 포항까지 이르는 대동맥이 될 것이며 지역발전의 큰 촉진제가 될 것입니다. 저는 이 고속도로의 건설이 침체된 지역경제를 활성화 시키고 실업자의 고용증대에 기여할 것이라는 점에서 큰 기대를 갖고 있습니다. 포항시민 여러분, 경북도민 여러분, 이곳 포항은 우리 철강 산업을 일으킨 본산이며, 대구, 경북 지역은 우리나라가 세계 11위의 경제규모로 성장하는데 핵심의 역할을 한 산업의 중심지입니다. 그럼에도 불구하고 대구와 포항간의 교통이 원활하지 못해, 산업물자의 소통에 지장을 받고 지역발전도 더디게 됨으로써 국가적으로 적지 않는 손실을 가져왔습니다.

오늘 이 기공식은 이 지역이 21세기 한국 산업을 명실상부하게 선도하는 중심지의 하나로 도약하는 출발점이 될 것입니다. 이 고속도로가 완공되는 2002년에는 대구와 포항지역의 생산품을 국내외 시장으로 실어 나르는 데 1시간 이상을 단축하게 됩니다. 이 고속도로를 기반으로 대구-구미-포항 광역권은 첨단 기술과 정보가 집약되는 21세기형 고도 산업지역으로 성장할 것이며 명실상부 특히... 태평양... 으로 뻗어 나가는 큰 관문이 될 것입니다. 나아가 경부, 중부내륙, 중앙 고속도로와 원활히 연결되어 인접지역의 개발에도 큰 도움을 줌으로써 지역협력과 국민화합을 촉진하게 될 것입니다.

이 자리에 참석자 여러분, 새 정부는 경쟁력을 약화시키고 있는 막대한 물류비용을 줄이기 위해 교통기간시설의 획기적 확충을 100대 국정과제의 하나로 선정한 바 있습니다. 앞으로 정부는 21세기를 대비하여 동서로 9개축, 남북으로 7개축의 고속도로망을 구축 할 것입니다. 또 전국에 일반화물 수송체계를 구축하고 항만과 도로를 연결하는 화물차 전용고속도로도 건설하려고 합니다. 이렇게 되면 오는 2002년에는 전국의 고속도로가 현재의 1.5배로 확충될 것입니다. 우리는 이를 바탕으로 한반도를 21세기의 물류 중심지로 만들려는 원대한 목표를 갖고 있습니다. 오늘 기공되는 대구-포항 간 고속도로는 이 원대한 목표를 앞당기는 시작이 되는 것입니다.

포항과 경북 지역 여러분, 그리고 공사 관계자 여러분, 고속도로는 국가 경쟁력의 기반이며 국민과 국민, 지역과 지역을 잇는 혈도입니다. 그리고 후손에게 물려줄 사랑스러운 유산이기도 합니다. 이 고속도로는 단순히 포항과 대구만을 잇는 68.4km의 짧은 길이 아니라 국민화합과 국가발전을 위해 전국으로, 세계로 뻗어가는 길고도 큰 길입니다.

아무쪼록 건설기술인, 여러분의 높은 기술력과 주민 여러분의 협조, 그리고 관계자 여러분의 지혜를 함께 모아 가장 효율적이고 튼튼한 도로를 건설해 주시기를 당부 드립니다. 어려운 국가 여건에도 불구하고 내일을 위한 고속도로를 건설하는 뜻을 다시 되새기면서 여러분 모두의 건승과 행복을 기원합니다.

여러분 감사합니다.", "https://dams.pa.go.kr/dams/PUBLICATION/2017/11/09/DOC/SRC/0204201711091117082122974017356.mp4", "대구 포항간 고속도로 건설기공식", "SPEECH");


call InsertScript("존경하고 사랑하는 국민여러분, 경주 시민여러분.

세계 각국에서 모이신 행사 참가자여러분, 그리고 자리를 함께 해주신 내외 귀빈 여러분!

 

오늘 천년고도인 경주에서 세계문화엑스포가 열리게 된 것을 진심으로 축하합니다. 이 행사에 참가하기 위해 세계의 여러 나라에서 오신 참가자 여러분을 우리 국민과 함께 환영합니다.

 

또한 이처럼 성대한 국제문화행사를 준비하느라고 애쓰신 이의근 도지사와 경북도민 여러분, 그리고 행사 관계자 여러분 노고에 격려를 보내는 바입니다.

 

놀랍게도 지금 이 자리에는 세계 4대문명의 각국의 유산이 함께 하고 있습니다. 그 어떤 갈등이나 대립도 없이 세계의 문화가 이렇게 한자리에 모인 것만으로도 충분히 이번 행사의 의의를 찾을 수 있다고 생각합니다.

 

분열과 대립으로 얼룩졌던 금세기가 처음으로 가고 있습니다.

 

20세기를 마무리 하고 있는 우리는 다가올 21세기를 화합과 평화의 시대로 이끌어갈 준비를 다해아합니다.

 

세계의 문화유산이 이렇게 한자리에 평화적으로 공존할 수 있다는 사실은 우리에게 많은 의미를 들려주고 있습니다.

 

지구상에 존재하는 다양한 문화에는 한민족이 살아온 삶의 모습은 물론 기쁨과 슬픔, 희망과 기원을 모두 담고 있습니다.

 

따라서 인간의 존엄성만큼이나 한민족의 문화적 존엄성도 있는 그대로 인정되어야 합니다.

 

이렇듯 문화의 다양성을 이해하고 존중하는 태도야말로 개발문화나 문명 간의 대립과 갈등을 극복하고 화합과 평화의 새로운 인류 문명을 창조할 수 있는 힘이라고 생각합니다.

 

흔히 국제 사회에서 벌어지는 정치적 갈등이나 국가 간의 모든 적대감과 대립의 근거에는 그 문화적 요소가 자리 잡고 있다고 합니다.

 

21세기를 문화전쟁 ,문화충돌의 시대라니, 불길한 예언을 한 사람도 있습니다. 만약 우리가 문화의 다양성과 차이성을 인정하고 이해하지 않는다면 다가오는 21세 역시 대립과 갈등의 시대를 면하기 어려울 것입니다.

오직 친구도 우방도 없는 위험한 생존의 논리만이 세계를 지배하게 될 것입니다.

 

그런 의미에서 세계 문화를 한자리에 모아 서로의 문화에 대한 이해를 높이는 세계문화엑스포행사는 새로운 세계를 화해와 평화의 시대로 만들려는 뜻 깊은 노력이 아닐 수 없습니다.

 

국민여러분, 그리고 행사 참가자 여러분, 우리 한민족은 5,000년의 유고한 역사를 가진 문화민족입니다.

 

특히 이곳 경주는 '유네스코'가 지정한 인류의 문화 유적지이기도 합니다. 경주는 그 옛날 동서양의 문화와 문명이 오갔던 실크로드의 동쪽 종착지였으며, 세계문화사에 보기 드물게 1천년의 찬란한 문화를 꽃피웠던 곳입니다.

 

우리의 선조들은 주변국은 물론 널리 서방세계의 문명을 받아들여 우리문화를 독창적으로 발전시켰습니다.

경주는 그 대표적인 예로써 중국 당나라의 불교를 받아들여 해동불교로 발전시켰던 것입니다. 오늘 경주가 보여주는 문화의 내일은 결코 폐쇄된 문화가 아니라 세계를 향해 열린 문화인 것입니다.

 

저는 지난 8월 15일 대한민국 정부수립 50주년을 맞이하여 21세기의 새로운 한국을 건설하려는 제2의 건국을 선언하면서 보편적 세계주의로 나아갈 것을 설명한 바 있습니다.

이는 세계의 문화를 받아들여 독창적으로 발전시킨 조상의 슬기를 되살려 열린 마음으로 세계를 받아들이고 세계 속의 한국을 건설하는 우리의 의지인 것입니다.

 

이번 경주문화엑스포는 그런 우리의 의지를 세계인에게 보여줄 좋은 기회가 될 것입니다 .국민 여러분 , 그리고 세계의 문화엑스포 참가자 여러분.

지금 세계의 많은 나라들이 경제적 어려움으로 고통을 받고 있습니다. 이미 세계가 국경 없는 경제체제에 들어선 이래, 한나라의 경제적 위기는 그 나라만의 문제로 국한되지 않습니다.

아시아의 위기가 서구의 어려움을 가져오고 러시아의 위기가 중남미의 경제위기를 불러오고 있습니다. 저는 지금 세계가 겪고 있는 어려움을 극복하기 위해서는 인류문화에 지혜와 용기를 하나로 모아야 한다고 생각합니다.

 

다양한 문화를 이해하고 받아들이는 포용력, 각각의 문화적 전통 속에 숨 쉬고 있는 기회와 용기 그리고 희망이 하나로 모아질 때 저는 세계적인 경제위기도 이겨낼 수 있다고 믿습니다. 나아가 21세기는 물질과 무력의시대가 아니라 문화의 세기입니다.

이제 문화는 인간의 정신적 가치와 삶의 질을 높이는데 그치는 것이 아니라 하나의 산업으로서 경제의 큰 몫을 차지하게 될 것입니다.

인류가 만들어낸 문화의 창조적인 힘들이 이 행사에 참여하는 여러 나라의 문화산업 발전에 큰 영광을 주기를 바라마지 않습니다.

 

우리 한국역시 문화민족답게 문화, 관광산업발전에 큰 힘을 쏟고 있습니다. 나아가 우리 한국은 문화의 큰 포용력으로써 화합의 시대를 이룩하여 당면한 경제위기를 극복하고 번영된 국가를 건설할 것입니다.

 

세계문화엑스포 참가자 여러분, 이제 우리는 오늘부터 두 달 동안 서로의 문화를 배우고 이해하는 시간을 갖게 될 것입니다. 그 문화들 속에 담긴 역사를 의미를 마음껏 향유하게 될 것입니다. 아무쪼록 이번 경주문화엑스포와 사랑과 평화의 지구촌 일세기를 앞당기는 세계인의 축제로 승화되기를 바라마지 않습니다.

 

이 행사를 주관하고 수고하시는 관계자 여러분과 문화적 자긍심에 가득 찬 행사 참가자 여러분에게 다시 한 번 감사드리며 경주세계문화엑스포의 성공적인 개최를 기원합니다. 여러분 모두가 인류의 커다란 품안에서 하나로 화합하고 발전하는 큰 힘을 얻게 되기를 바랍니다. 여러분 대단히 감사합니다.", "https://dams.pa.go.kr/dams/PUBLICATION/2017/11/09/DOC/SRC/0204201711091117261429594017843.mp4", "'98경주세계문화엑스포 개막식' 대통령 연설", "SPEECH");


insert into scripts(content, original_video, title, category)
values("본 강의는 삼성 청년 SW아카데미의 컨텐츠로 보안서약서에 의거하여 강의 내용을 어떠한 사유로도 임의로 복사, 촬영, 녹음, 복제, 보관, 전송하거나 허가받지 않은 저장매체를 이용한 보관, 제3자에게 누설, 공개, 또는 사용하는 등의 행위를 금합니다.",
null, "SSAFY 보안 서약서", "SPEECH");

insert into scripts(content, original_video, title, category)
values('북한 정찰총국이 배후에 있는 "킴수키" 조직을 비롯해 중국, 러시아, 이란 등과 연계된 해커들이 생성형AI(인공지능) 챗GPT를 사이버범죄에 활용하는 것으로 확인됐다.

14일(현지시간) 로이터통신과 뉴욕타임스(NYT) 등 외신에 따르면 MS(마이크로소프트)는 자사가 투자한 오픈AI와 함께 해킹그룹들의 챗GPT 이용 사실을 감지하고 이들의 사이트 접근을 차단했다고 밝혔다.

MS의 이번 보고서에 따르면 이 보고서에선 "에메랄드 슬릿"으로 지칭된 해킹그룹 "킴수키" 등 북한 해커들은 지역 안보 전문가 등을 대상으로 스피어피싱 공격을 하기 위해 보낼 악성메일 내용을 보다 설득력 있게 작성하고자 챗GPT를 이용했다. 또 러시아 군사정보국 연계 해킹그룹은 우크라이나전쟁 관련해 위성통신과 레이더 기술에 대한 연구에 활용했다. 중국 정부와 연계된 해커들의 경우 경쟁국 정보기관이나 보안 관련 문제 및 특정 개인에 대한 질문 등으로 LLM(대규모언어모델)을 테스트하고 있다. 이란 이슬람혁명수비대 연계 집단은 북한 사례처럼 페미니즘 활동가를 겨냥한 피싱메일에 쓰는 한편, 보안시스템 우회방법 모색에도 챗GPT의 도움을 받았다.

MS와 오픈AI는 이 같은 국가지원 해킹그룹들의 자사 AI 제품·서비스 사용에 대해 전면적인 금지 조치를 발표했다. 다만 일부 전문가들의 우려처럼 해커들이 AI를 통해 새로운 사이버위협으로 간주할만한 공격수법을 만들어낸 경우는 없었다고 덧붙였다. 아직 해커들의 AI 도구 사용이 이메일 초안 작성, 문서 번역, 프로그래밍 오류수정 등으로 초기단계이지만 점진적으로 확대되고 있다는 게 양사의 설명이다.

톰 버트 MS 보안담당 부사장은 "해커들도 일반 사용자들처럼 생산성을 높이는 데 오픈AI AI모델을 사용했다"고 말했다. 또 밥 로트스테드 오픈AI 보안 책임자는 "적대국과 연계된 해커들이 AI로 기존 검색엔진 등을 썼던 것보다 참신한 공격수법을 찾아냈다는 증거는 아직 발견되지 않았다"고 설명했다

한편 류펑위 주미중국대사관 대변인은 로이터의 문의에 "중국에 대한 근거 없는 비방과 비난에 반대하며, 모든 인류의 공동 복지를 증진하기 위해 안전하고 신뢰할 수 있으며 통제 가능한 AI 기술 배치를 옹호한다"고 답했다.',
null, "북·중·러 사이버범죄자들도 챗GPT 썼다…MS-오픈AI, 전면 차단 조치", "NEWS");

-- dummmy data for user
insert into 
users(birth_year, complain_count, join_date, restrict_date, solo_duration_in_minute, study_duration_in_minute, email, name, nickname, password, user_id, role)
values(2024, 0, now(), null, 0, 0, "ploud.e207@gmail.com", "ploud", "ploud", "$2a$10$SppIEZi59rcfzVZgSUM/M.NF9RDPhqumNQ2TPv2n/zaV1qQ5y44jq", "ploud", "USER");

-- dummy data for speeches, video, scores
SET @uId := 'ploud'; # 아이디

insert into videos(play_time, video_path) values(300000, "https://ploudbucket.s3.ap-southeast-2.amazonaws.com/speech/ploud1/dummy.mp4");

insert into scores(clarity, speed, volume) values(floor(rand()*50) + 50,floor(rand()*50) + 50,floor(rand()*50) + 50);

insert into
speeches(category_id, personal, score_id, script_id, video_id, record_time, speech_end_time, comment, title, user_id)
values(2, true, 1, 17, 1, now() - INTERVAL 8 DAY , now() - INTERVAL 8 DAY + INTERVAL 5 MINUTE, "comment1", "스피치 제목1", @uId);


insert into videos(play_time, video_path) values(600000, "https://ploudbucket.s3.ap-southeast-2.amazonaws.com/speech/ploud1/dummy.mp4");
insert into scores(clarity, speed, volume) values(floor(rand()*50) + 50,floor(rand()*50) + 50,floor(rand()*50) + 50);
insert into
speeches(category_id, personal, score_id, script_id, video_id, record_time, speech_end_time, comment, title, user_id)
values(1, true, 2, 14, 2, now() - INTERVAL 7 DAY , now() - INTERVAL 7 DAY + INTERVAL 10 MINUTE, "comment2", "스피치 제목2", @uId);


insert into videos(play_time, video_path) values(300000, "https://ploudbucket.s3.ap-southeast-2.amazonaws.com/speech/ploud1/dummy.mp4");
insert into scores(clarity, speed, volume) values(floor(rand()*50) + 50,floor(rand()*50) + 50,floor(rand()*50) + 50);
insert into
speeches(category_id, personal, score_id, script_id, video_id, record_time, speech_end_time, comment, title, user_id)
values(1, true, 3, 7, 3, now() - INTERVAL 6 DAY , now() - INTERVAL 6 DAY + INTERVAL 15 MINUTE, "comment3", "스피치 제목3", @uId);


# 스터디 모드 3개
insert into videos(play_time, video_path) values(600000, "https://ploudbucket.s3.ap-southeast-2.amazonaws.com/speech/ploud1/dummy.mp4");
insert into scores(clarity, speed, volume) values(floor(rand()*50) + 50,floor(rand()*50) + 50,floor(rand()*50) + 50);
insert into
speeches(category_id, personal, score_id, script_id, video_id, record_time, speech_end_time, comment, title, user_id)
values(1, false, 4, null, 4, now() - INTERVAL 5 DAY , now() - INTERVAL 5 DAY + INTERVAL 10 MINUTE, "comment4", "스피치 제목4", @uId);


insert into videos(play_time, video_path) values(600000, "https://ploudbucket.s3.ap-southeast-2.amazonaws.com/speech/ploud1/dummy.mp4");
insert into scores(clarity, speed, volume) values(floor(rand()*50) + 50,floor(rand()*50) + 50,floor(rand()*50) + 50);
insert into
speeches(category_id, personal, score_id, script_id, video_id, record_time, speech_end_time, comment, title, user_id)
values(2, false, 5, null, 5, now() - INTERVAL 1 DAY , now() - INTERVAL 1 DAY + INTERVAL 10 MINUTE, "comment5", "스피치 제목5", @uId);


insert into videos(play_time, video_path) values(300000, "https://ploudbucket.s3.ap-southeast-2.amazonaws.com/speech/ploud1/dummy.mp4");
insert into scores(clarity, speed, volume) values(floor(rand()*50) + 50,floor(rand()*50) + 50,floor(rand()*50) + 50);
insert into
speeches(category_id, personal, score_id, script_id, video_id, record_time, speech_end_time, comment, title, user_id)
values(2, false, 6, null, 6, now() , now() + INTERVAL 5 MINUTE, "comment6", "스피치 제목6", @uId);


# feedbacks
insert into feedbacks(speech_id, time_log, content, user_id)
values(4, 10898020000, "흥미로운 주제를 선정하셔서 흥미를 끌 수 있었습니다.", @uId);

insert into feedbacks(speech_id, time_log, content, user_id)
values(4, 21970894973, "사용한 용어나 전문 용어를 쉽게 이해할 수 있게 설명해주셔서 좋았습니다.", @uId);

insert into feedbacks(speech_id, time_log, content, user_id)
values(4, 37821462727, "전반적으로 자료에 대한 깊은 이해가 돋보였습니다.", @uId);



insert into feedbacks(speech_id, time_log, content, user_id)
values(5, 37821462727, "흥미로운 주제를 선정하셔서 흥미를 끌 수 있었습니다.", @uId);

insert into feedbacks(speech_id, time_log, content, user_id)
values(5, 21970894973, "사용한 용어나 전문 용어를 쉽게 이해할 수 있게 설명해주셔서 좋았습니다.", @uId);

insert into feedbacks(speech_id, time_log, content, user_id)
values(5, 10898020000, "전반적으로 자료에 대한 깊은 이해가 돋보였습니다.", @uId);



insert into feedbacks(speech_id, time_log, content, user_id)
values(6, 503431110, "흥미로운 주제를 선정하셔서 흥미를 끌 수 있었습니다.", @uId);

insert into feedbacks(speech_id, time_log, content, user_id)
values(6, 7945537862, "대화 형식의 질문들이 참석자들과 소통을 촉진했습니다.", @uId);

insert into feedbacks(speech_id, time_log, content, user_id)
values(6, 16143996900, "각주나 참고자료를 잘 활용하여 신뢰성 있는 발표를 만들었습니다.", @uId);

insert into feedbacks(speech_id, time_log, content, user_id)
values(6, 24193175498, "훌륭한 목소리 조절로 강조점을 잘 부각시켰습니다.", @uId);

