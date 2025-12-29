--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: word_level; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.word_level AS ENUM (
    'A1',
    'A2',
    'B1',
    'B2',
    'C1',
    'C2'
);


ALTER TYPE public.word_level OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: user_words; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_words (
    id integer NOT NULL,
    user_id integer NOT NULL,
    word_id integer NOT NULL,
    is_guessed boolean DEFAULT false,
    attempts integer DEFAULT 0,
    last_attempt_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.user_words OWNER TO postgres;

--
-- Name: user_words_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_words_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_words_id_seq OWNER TO postgres;

--
-- Name: user_words_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_words_id_seq OWNED BY public.user_words.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password_hash character varying(255) NOT NULL,
    guessed_words integer DEFAULT 0,
    failed_attempts integer DEFAULT 0
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: words; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.words (
    id integer NOT NULL,
    word character varying(100) NOT NULL,
    description text,
    example1 text,
    example2 text,
    level public.word_level DEFAULT 'B1'::public.word_level
);


ALTER TABLE public.words OWNER TO postgres;

--
-- Name: words_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.words_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.words_id_seq OWNER TO postgres;

--
-- Name: words_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.words_id_seq OWNED BY public.words.id;


--
-- Name: user_words id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_words ALTER COLUMN id SET DEFAULT nextval('public.user_words_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: words id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.words ALTER COLUMN id SET DEFAULT nextval('public.words_id_seq'::regclass);


--
-- Data for Name: user_words; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_words (id, user_id, word_id, is_guessed, attempts, last_attempt_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, username, email, password_hash, guessed_words, failed_attempts) FROM stdin;
\.


--
-- Data for Name: words; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.words (id, word, description, example1, example2, level) FROM stdin;
1	again	Once more  or another time.	Let's try that again from the beginning.	She watched the movie again because she loved it so much.	A1
2	also	In addition; synonym too.	He speaks Spanish and also understands French.	The book is informative and also entertaining.	A1
3	always	At all times; on every occasion.	He always brings a positive attitude.	I always drink coffee in the morning.	A1
4	and	A conjunction used to connect words phrases or clauses.	She bought apples and oranges.	You can have tea and biscuits.	A1
5	begin	To start something.	Let's begin the lesson now.	The move began at 7 p.m.	A1
6	below	At a lower level or position than something else.	The temperature dropped below freezing.	Look at the notes written below the image.	A1
7	camera	A device used to take photographs or record videos.	I forgot to bring my camera on vacation.	The security camera captured the whole incident.	A1
8	catch	To grab or intercept something that is moving.	He managed to catch the ball with one hand.	Try to catch the train before it leaves.	A1
9	choose	To decide on an option from a selection.	You must choose between the two options.	She chose the blue paint for the walls.	A1
10	close	Near in space or relationship, or to shut something.	They are very close friends.	Don't forget to close the door.	A1
11	doctor	A medical professional who diagnoses and treats illnesses.	The doctor examined the patient.	She wants to be a doctor someday.	A1
12	early	Before the usual or expected time.	He arrived early for the meeting.	The early bird cathes the worm.	A1
13	example	A specific case or instance that illustrates a concept.	Can you give an example?	She set a good example for others.	A1
14	find	To discover or locate something.	I can't find my keys.	Did you find the answer?	A1
15	finish	To complete a task or bring something to an end.	I need to finish my homework.	He finished first in the race.	A1
16	forget	To lose memory of something.	Don't forget your appointment.	I forgot to turn off the lights.	A1
17	friend	A person with whom one has a close and positive relationship.	She is my best friend.	He made a new friend at school.	A1
18	give	To provide or offer something to someone.	Please give me a moment.	He gave her a gift.	A1
19	go	To move from one place to another.	Let's go to the park.	He goes to school by bus.	A1
20	goodbye	A parting expression used when leaving.	She waved goodbye.	Saying goodbye was hard.	A1
21	have	To own, hold, or possess.	I have a question.	They have three children.	A1
22	he	A pronoun used for a male person.	He is my brother.	He likes to play soccer.	A1
23	hello	A greeting or expression of acknowledgment.	Hello! How are you?	She said hello to everyone.	A1
24	here	In or at this place.	Come here, please.	They keys are right here.	A1
25	holiday	A day of celebration or rest, often for a special occasion.	We're going on holiday next week.	Christmas is my favorite holiday.	A1
26	hospital	A healthcare institution where patients receive medical treatment.	He was taken to the hospital.	She works at a children's hospital.	A1
27	important	Of great significance or value.	Family is very important to me.	This is an important decision.	A1
28	it	A pronoun used to refer to a thing previously mentioned or easily identified.	It is raining outside.	I found it difficult concentrate.	A1
29	know	To be aware of or have information about something.	Do you know the answer?	I know her from school.	A1
30	learn	To acquire knowledge or skills through study or experience.	I want to learn how to code.	Children learn quickly.	A1
31	look	To direct your gaze toward something in order to see it.	Look at this amazing sunset!	She looked very happy today.	A1
32	much	A large amount or extent of something.	Thank you so much!	He didn't say much.	A1
33	near	Close to; at a short distance from.	We live near the school.	The deadline is near.	A1
34	never	At no time; not ever.	I've never been to Japan.	Never give up on your dreams.	A1
35	no	A negative response or denial.	No, I haven't seen it.	There's no reason to worry.	A1
36	now	At the present moment; immediately.	Let's go now.	Now is the perfect time.	A1
37	often	Frequently; many times.	I often go for walks in the evening.	She often visits her grandmother.	A1
38	only	No more than; solely; just.	He's the only one who came.	I only need five minutes.	A1
39	or	A conjunction used to link alternatives or choices.	Would you like tea or coffee?	Call me tonight or tomorrow.	A1
40	outside	The external side or surface of something.	Let's eat outside today.	There's a noise coming from outside.	A1
41	question	A sentence or expression used to inquire or seek information.	I have a question about the assignment.	He questioned the decision.	A1
42	she	A pronoun used to refer to a female person or animal.	She is my best colleague.	She called to check on me.	A1
43	show	To display or present something for others to see or understand.	Let me show you how it works.	The show starts at eight.	A1
44	some	An unspecified amount or number of something.	Would you like some coffee?	Some people prefer tea over coffee.	A1
45	sometimes	Occasionally; at times.	I sometimes forget my keys.	Sometimes it's better to stay silent.	A1
46	speak	To use words to communicate with others.	Please speak clearly into the microphone.	He spoke about his experiences abroad.	A1
47	start	To begin an activity or process.	I'll start my new job next week.	Let's start the meeting now.	A1
48	stop	To bring an action or movement to an end.	Please stop talking during the movie.	He stopped by the store on his way home.	A1
49	take	To acquire possession or control over something.	Please take a seat.	He took the opportunity to travel abroad.	A1
50	talk	To communicate or converse using words.	Let's talk about your plans.	She talked for hours on the phone.	A1
51	teach	To impart knowledge or skills to others.	She loves to teach children.	He taught me how to swim.	A1
52	tell	To communicate information or a story to someone through speaking or writing.	Please tell me the truth.	He told a funny story.	A1
53	the	A definite article used to specify a noun.	The sky is very clear tonight.	I forgot the keys at home.	A1
54	there	In or at that place; at a particular location.	There are many restaurants nearby.	She left her bag over there.	A1
55	they	A pronoun used to refer to a group of people or things.	They are coming to the party.	They finished the project on time.	A1
56	think	To use one's mind to form thoughts, ideas, or judgments.	I think  it's going to rain.	Think carefully before you decide.	A1
57	today	The current day, the day that is happening now.	I have a meeting today.	Today is a special day.	A1
58	tomorrow	The day after today; the next day.	We leave for vacation tomorrow.	Tomorrow will be even better.	A1
59	too	In addition; also; excessively.	This coffee is too hot to drink.	She was too tired to continue.	A1
60	under	In a lower position or beneath something.	The keys are under the table.	He works under a lot of pressure.	A1
61	understand	To grasp the meaning or concept of something.	I don't understand the question.	It's important to understand both sides.	A1
62	use	To employ something for a purpose or function.	How do you use this machine?	I use public transport to get to work.	A1
63	vacation	A period of time spent away from work or regular activities for rest or travel.	We're planning a vacation to Italy.	He took a short vacation last month.	A1
64	very	To a high degree or extent; extremely.	I'm very excited about the trip.	It's very cold today.	A1
65	visit	To go to a place or see someone for a purpose or social interaction.	We plan to visit my grandparents.	She visited the museum on Saturday.	A1
66	wait	To remain in a state of expectation or delay before an event or action occurs.	Please wait here until called.	I had to wait an hour for the bus.	A1
67	walk	To move at a regular pace on foot.	Let's go for a walk.	He walks to work every day.	A1
68	want	To desire or wish for something.	I want a new phone.	They want to see a movie tonight.	A1
69	well	In a good or satisfactory manner; in good health.	I hope you are doing well.	She sings very well.	A1
70	what	Used to ask for information about something.	What is your name?	I didn't hear what you said.	A1
71	when	At what time; used to ask about time.	When does the movie start?	Tell me when you arrive.	A1
72	where	In or at what place; used to ask about location.	Where are you going?	I wonder where he left his phone.	A1
73	which	Used to specify one or more items from a defined set.	Which color do you prefer?	I don't know which way to turn.	A1
74	who	A pronoun used to ask about a person or people.	Who is that at the door?	She is the one who helped me.	A1
75	why	The reason or cause for something; used to ask about a reason.	Why are you late?	I don't understand why he left early.	A1
76	work	To engage in an activity or job that requires effort, often for pay.	I have to work late tonight.	He is looking for work in the city.	A1
77	write	To compose words or symbols in a structured form using a tool or device.	Please write your name here.	She likes to write in her journal.	A1
78	year	A period of twelve months or 365 (or 366) days.	This year has been amazing.	He graduated last year.	A1
79	yes	An affirmative response or agreement.	Yes, I would love some coffee.	She answered yes without hesitation.	A1
80	yesterday	The day before today.	I saw her yesterday at the park.	Yesterday was a holiday.	A1
81	you	A pronoun used to refer to the person or people being addressed.	You are very kind.	Can you help me with this?	A1
82	above	At a higher level or position than something else.	The painting hangs above the fireplace.	Temperatures today are expected to rise above normal levels.	A2
83	against	In opposition to something or someone, often suggesting resistance or contrast.	He stood tightly against the proposal.	The boat was struggling against the current.	A2
84	agree	To have the same opinion or to consent to something, often in a cooperative or harmonious manner.	I completely agree with your opinion.	They agreed to meet at noon.	A2
85	almost	Nearly but not quite.	I almost forgot your birthday.	The glass is almost full.	A2
86	already	Before the present time.	I already finished my homework.	She had already left when I arrived.	A2
87	artist	A person who creates art, such as paintings, music, or performances.	The artist painted a beautiful landscape.	She is a talented digital artist.	A2
88	become	To change or develop into something different.	She wants to become a scientist one day.	The weather is becoming colder.	A2
89	believe	To accept something as true or have faith in it.	I believe in second chances.	She couldn't believe her eyes.	A2
90	borrow	To take something temporarily with the intention of returning it.	Can I borrow your pen for a second?	She borrowed a dress for the party.	A2
91	break	To separate into pieces or stop working, or a short pause in an activity.	Don't break that glass!	Let's take a short break.	A2
92	bring	To carry or move something or someone to a place.	Don't forget to bring your ID.	She brought cookies for the meeting.	A2
93	build	To construct or create something, either physically or metaphorically.	They plan to build a new school.	Trust takes time to build.	A2
94	carefully	With great attention or caution.	Read the instructions carefully before starting.	He carefully placed the vase on the shelf.	A2
95	century	A period of 100 years.	The building was constructed in the 18th century.	This tradition has lasted for over a century.	A2
96	certainly	Without a doubt; definitely.	I'll certainly help you with your project.	She certainly knows how to make an impression.	A2
97	change	To make or become different.	You should change your password regularly.	Moving to a new city is a big change.	A2
98	check	To examine something for accuracy or correctness.	Please check your answers before submitting.	I'll check the schedule and let you know.	A2
99	clear	Easy to understand, free of obstacles, or transparent.	Make your intentions clear.	The sky was clear and blue.	A2
100	clearly	In a way that is easy to understand or see.	She clearly explained the problem.	He was clearly upset about the news.	A2
101	collect	To gather things together, usually in an organized way.	She collects vintage postcards.	Please collect your belongings before leaving.	A2
102	college	An educational institution for higher learning.	He's going to college next year.	College life can be both fun and challenging.	A2
103	complete	To finish something fully and successfully.	I need to complete this form.	The project is finally complete.	A2
104	copy	To duplicate or imitate something exactly.	Can I have a copy of the report?	Don't copy someone else's work.	A2
105	correct	Free from errors or mistakes, or to fix something that is wrong.	That's the correct answer.	He corrected his spelling mistakes.	A2
106	dangerous	Involving risk, harm, or the potential for injury.	That's a dangerous curve ahead.	Climbing without gear is dangerous.	A2
107	decide	To make a choice after considering options.	I can't  decide what to wear.	He decided to stay home.	A2
108	department	A division within an organization that specializes in a specific function.	He works in the sales department.	The fire department responded quickly.	A2
109	describe	To explain the characteristics or details of something.	Can you describe the suspect?	She described the scene vividly.	A2
110	discuss	To talk about a topic in detail with others.	Let's discuss your ideas.	They discussed the project in detail.	A2
111	document	A written or digital record containing important information.	I saved the document to my laptop.	The document needs your signature.	A2
112	else	In addition to what has been mentioned; other.	Is there anything else you need?	Someone else will handle it.	A2
113	enough	Adequate in quantity or degree.	We don't have enough time.	She didn't study enough for the test.	A2
114	enter	To go into a place or join an activity.	Please enter your password.	They entered the building quietly.	A2
115	ever	At any time; always.	Have you ever been to France?	It was the best day ever!	A2
116	exercise	Physical activity to improve fitness or a task to practice skills.	I exercise three times a week.	This exercise improves your balance.	A2
117	explain	To make something clear by describing it in detail.	Can you explain this again?	He explained the rules clearly.	A2
118	fashion	A popular style or trend in clothing, behavior, or culture.	She's studying fashion design.	Trends in fashion change rapidly.	A2
119	favorite	A person, place, or thing preferred over others.	Chocolate is my favorite dessert.	Who's your favorite actor?	A2
120	follow	To move behind or obey instructions.	Follow the instructions carefully.	She followed him into the room.	A2
121	foreign	Related to another country or unfamiliar place.	She speaks three foreign languages.	He invested in a foreign company.	A2
122	grow	To increase in size, number, or importance, or to develop over time.	Plants need water to grow.	He grew taller over the summer.	A2
123	happen	To occur or take place, usually by chance or unpredictably.	Accidents happen.	What will happen next?	A2
124	hard	Solid firm or tough; difficult to do or understand.	That test was really hard.	He works hard every day.	A2
125	healthy	In good physical or mental condition; free from illness.	She eats a healthy diet.	Exercise keeps you healthy.	A2
126	hold	To grip, carry, or keep something in your hand or possession.	Can you hold this bag for me?	She held his hand tightly.	A2
127	hope	A feeling of expectation and desire for something to happen.	I hope you feel better soon.	She never gave up hope.	A2
128	how	In what way or manner; by what means.	How do you solve this problem?	I wonder how he did that.	A2
129	improve	To make something better or enhance its quality.	Practice will improve your skills.	Her grades have improved this term.	A2
130	include	To make something a part of a whole or group.	The package includes free shipping.	Don't forget to include your name.	A2
131	journey	A long trip or process of traveling from one place to another.	The journey took five hours by train.	Life is a journey, not a destination.	A2
132	just	Exactly; only; merely.	I just finished my homework.	He'a fair and just leader.	A2
133	lose	To no longer have something or fail to keep or maintain it.	Try not to lose your phone again.	We lost the game by one point.	A2
134	market	The economic system where goods and services are bought and sold.	The market opens at 9 AM.	They launched a new product to the market.	A2
135	maybe	Possibly but not certainly.	Maybe we can go tomorrow.	Maybe he forgot the meeting.	A2
136	member	A person who belongs to a group or organization.	He is a member of the team.	Are you a gym member?	A2
137	middle	The central point, position, or part of something.	He stood in the middle of the room.	We met in the middle of the day.	A2
138	modern	Relating to the present time or the latest trends, ideas, or technology.	They live in a modern apartment.	Modern technology changes fast.	A2
139	moment	A brief period of time or a particular point in time.	Just give me a moment.	That was a special moment.	A2
140	move	To change position, location, or state.	Let's move the table.	They moved to a new house.	A2
141	nearly	Almost; not quite.	I'm nearly done.	He nearly missed the bus.	A2
142	offer	To present or propose something for someone to accept or refuse.	They offered me a great deal.	Can I offer you some help?	A2
143	order	A request for something to be done or delivered, or the arrangement of things in a specific sequence.	I'd like to order a pizza.	Keep everything in order.	A2
144	perfect	To make something free from errors or flaws, or having no shortcomings.	This is the perfect gift.	She wants everything to be perfect.	A2
145	perhaps	Possibly; it could be that.	Perhaps we'll try again later.	Perhaps she forgot.	A2
146	picture	A visual representation of something, such as a drawing or photograph.	She took a beautiful picture.	Can you picture what it looked like?	A2
147	plan	A detailed proposal or scheme for achieving a goal or completing a task.	What's the plan for today?	We need to plan ahead.	A2
148	prepare	To make something ready for use or a future event.	I need to prepare for the exam.	They prepared dinner together.	A2
149	probably	Likely to happen or be true.	It will probably rain later.	She's probably at home.	A2
150	quick	Moving or occurring with speed; fast.	She gave a quick answer.	Be quick or you'll miss the bus.	A2
151	quickly	In a fast or rapid manner.	The child quickly ran to his mother.	He quickly finished his homework.	A2
152	quiet	A lack of noise or calmness, or a peaceful environment.	Please be quiet during the movie.	It's a quiet place to study.	A2
153	record	To capture or document something for preservation or later reference.	He set a new world record.	Please record the meeting.	A2
154	return	To go back to a previous place or position, or to give back something.	When will you return?	She returned the book to the library.	A2
155	save	To keep something from being lost or destroyed, or to store something for future use.	I try to save money every month.	She saved the document before closing it.	A2
156	share	To give a portion of something to others, or to use something together.	I share an apartment with two friends.	She shared her story with the audience.	A2
157	slowly	In a slow manner; at a low speed.	The car moved slowly through traffic.	Speak slowly so everyone can understand.	A2
158	so	To such a degree; therefore; for that reason.	I was tired, so I went to bed early.	It's so hot today!	A2
159	somewhere	At an unspecified or unknown location.	I left my bag somewhere in the house.	Let's go somewhere quiet.	A2
160	soon	In the near future; shortly.	We'll be leaving soon.	She hopes to visit soon.	A2
161	special	Unique, distinctive, or different from the ordinary.	Today is a special day for us.	She made a special effort to attend.	A2
162	surprise	An unexpected event or outcome that causes astonishment.	His visit was a wonderful surprise.	She surprised me with a birthday party.	A2
163	time	The continuous progress of existence, measured in hours, minutes, and seconds.	What time does the movie start?	Time passes quickly when you're having fun.	A2
164	traffic	The movement of vehicles or people along roads or through a system.	Traffic was terrible this morning.	They got stuck in heavy traffic.	A2
165	try	To attempt or make an effort to do something.	Always try your best.	I'll try to finish by noon.	A2
166	useful	Providing a benefit or serving a practical purpose.	This guidebook is very useful.	Learning a second language is useful.	A2
167	way	A method, style, or manner of doing something.	This is the quickest way to the station.	She showed me the way to the library.	A2
168	win	To achieve victory or success in a competition or challenge.	We hope to win the game.	She won a prize in the competition.	A2
169	wonderful	Extremely good, impressive, or inspiring wonder.	That was a wonderful meal.	We had a wonderful time at the party.	A2
170	yet	Up until now; still; used in negative or interrogative contexts.	Have you finished yet?	She hasn't called yet.	A2
171	ability	The skill or power to do something, often through talent, experience, or training.	His ability to solve complex problems is impressive.	She has the ability to speak four different languages fluently.	B1
172	access	The means or opportunity to approach, enter, or use something.	Only employees have access to the secure area.	She was granted access to the confidential documents.	B1
173	accompany	To go or be with someone as a companion or escort.	She asked her friend to accompany her to the doctor.	Thunder usually accompanies lightning.	B1
174	accurate	Correct or precise, with no errors or mistakes.	The report contains accurate information.	Her description was so accurate, it felt like I was there.	B1
175	achieve	To successfully reach a desired result or goal.	She worked hard to achieve her dream of becoming a doctor.	It takes discipline to achieve success.	B1
176	advise	To offer guidance or recommendations based on knowledge or experience.	I advise you to read the terms carefully.	She was advised to get more rest.	B1
177	afford	To have enough resources, particularly money, to be able to purchase or experience something.	I can't afford to buy a new car right now.	We can't afford to make any mistakes on this project.	B1
178	agency	An organization or business that provides a specific service.	She works for a marketing agency downtown.	The environmental agency issued a warning about pollution.	B1
179	ahead	In front or towards the future.	We have a long journey ahead of us.	She looked straight ahead while walking.	B1
180	ambition	A strong desire to achieve success, power, or a specific goal through determination and effort.	Her ambition is to become a successful director.	He showed great ambition from a young age.	B1
181	ancient	Very old or from a long time ago, often referring to historical periods or civilizations.	They visited the ruins of an ancient temple.	Ancient civilizations had advanced knowledge of astronomy.	B1
182	announce	To make information publicly known, often in a formal or official manner.	The company will announce the winner tomorrow.	He announced his resignation during the meeting.	B1
183	annual	Occurring once a year or covering a period of one year.	We hold an annual picnic every summer.	The annual report was released last week.	B1
184	appear	To become visible or noticeable, or to seem to be a certain way.	He didn't appear at the meeting.	A rainbow appeared after the storm.	B1
185	apply	To put something into use, request something formally, or be relevant to a situation.	You can apply online for the job.	She applied the cream to her skin.	B1
186	approach	To move closer to something or someone, or a way of dealing with a situation.	We need a new approach to this problem.	She slowly approached the edge of the cliff.	B1
187	approve	To officially accept or agree to something.	The manager did not approve the budget increase.	They approved the new design immediately.	B1
188	argue	To express opposing views in a discussion, often in a heated or passionate way.	The children began to argue over the toy.	He argued that the policy was unfair.	B1
189	arrange	To organize or plan things in a specific order or structure.	I'll arrange the meeting for tomorrow.	She arranged the flowers in a vase.	B1
405	declare	To announce something formally or publicly.	He declared his innocence.	They declared the results officially.	B2
190	arrival	The act of reaching a destination.	We were excited about the arrival of our guests.	The arrival of spring brings warmer weather.	B1
191	attach	To fasten, join, or connect something to another.	Please attach the file to the email.	She attached a note to the gift.	B1
192	attempt	To make an effort to achieve or do something.	He made an attempt to climb the mountain.	She attempted to fix the broken vase.	B1
193	attend	To be present at an event or take care of something.	I plan to attend the meeting tomorrow.	Thousands attended the music festival.	B1
194	attitude	A way of thinking or feeling about something, often reflected in behavior.	Her positive attitude is catching.	You need to change your attitude toward work.	B1
195	avoid	To keep away from something or prevent it from happening.	Try to avoid making the same mistake again.	He avoided eye contact during the interview.	B1
196	back	The rear part of something, or to support a person, idea, or action.	She turned back to look at the building one more time.	I'll be back in an hour.	B1
197	behave	To act in a certain way, especially in a socially acceptable manner.	Please behave yourself during the ceremony.	The dog behaves well around strangers.	B1
198	behavior	The way a person or animal acts in different situations.	His behavior was unacceptable at the dinner.	We are studying animal behavior in biology class.	B1
199	benefit	An advantage or positive effect gained from something.	Exercise has many health benefits.	Everyone will benefit from the new policy.	B1
200	besides	In addition to or apart from something.	Besides her job, she volunteers at a shelter.	Besides English, he also speaks German.	B1
201	brave	Showing courage and facing fear or danger without hesitation.	The brave firefighter saved the child.	It was brave of you to speak out.	B1
202	breathe	To inhale and exhale air, essential for life.	Remember to breathe deeply during meditation.	He could barely breathe after running.	B1
203	brief	Short in duration or giving only essential information.	She gave a brief explanation before leaving.	We had a brief conversation in the hallway.	B1
204	brilliant	Exceptionally bright, intelligent, or impressive.	That was a brilliant idea!	The sun looked brilliant against the blue sky.	B1
205	cancel	To stop or call off an event, plan, or arrangement.	We had to cancel our trip due to rain.	The event was canceled at the last minute.	B1
206	celebrate	To mark a special occasion with festivities or recognition.	We'll celebrate your birthday this weekend.	They celebrated their victory with a party.	B1
207	central	Located at or forming the main part of something.	The central theme of the book is love.	We met at the central train station.	B1
208	challenge	A difficult task or situation requiring effort to overcome.	Climbing the mountain was a big challenge.	She loves a good challenge.	B1
209	character	A person's traits or qualities, or a figure in a story.	The main character in the story is a detective.	Honesty is part of his character.	B1
210	cheerful	Full of happiness and positivity.	She always has a cheerful smile.	The room was decorated in cheerful colors.	B1
211	choice	The act of selecting between two or more options.	That's a difficult choice to make.	You made a great choice with that dress.	B1
212	circle	A round shape where all points are equally distant from the center.	Draw a circle around the correct answer.	They sat in a circle and shared stories.	B1
213	comment	A spoken or written statement expressing an opinion or reaction.	She left a nice comment on my post.	Do you want to comment on the situation?	B1
214	communicate	To share information, ideas, or feelings with others.	It's important to communicate clearly.	They use emails to communicate with clients.	B1
215	compare	To examine similarities and differences between two or more things.	Compare your answers with your partner's.	Don't compare yourself to others.	B1
216	concentrate	To focus attention or effort on a task.	Please concentrate on your work.	It's hard to concentrate with all this noise.	B1
217	condition	The state or circumstances of something, or a requirement for something to happen.	The car is in excellent condition.	Weather conditions worsened overnight.	B1
218	confirm	To verify or prove that something is true or accurate.	Please confirm your attendance.	The test confirmed our suspicions.	B1
219	connect	To join or link things together physically or conceptually.	We need to connect the cables properly.	The bridge connects two cities.	B1
220	consider	To think carefully about something before making a decision.	Please consider my request.	He is considering a career change.	B1
221	control	To have power over something or regulate its function.	The pilot controls the aircraft.	You need to control your emotions.	B1
222	create	To bring something into existence or invent something new.	Let's create something new.	She created a beautiful painting.	B1
223	creative	Having the ability to produce original and imaginative ideas.	He's very creative with his writing.	We need a creative solution.	B1
224	currency	A system of money used in a particular country.	What currency is used in Japan?	The value of the currency dropped.	B1
225	damage	Physical or emotional harm or destruction.	The storm caused severe damage.	Don't damage the furniture.	B1
226	decision	A conclusion or resolution reached after thought.	That was a difficult decision.	The final decision is yours.	B1
227	decorate	To make something more attractive by adding designs or embellishments.	They decorated the room with balloons.	Let's decorate the cake with icing.	B1
228	defend	To protect something or someone from harm or attack.	Soldiers defend their country.	He defended his opinion strongly.	B1
229	deliver	To bring or hand over something to its intended recipient.	They deliver packages on Sundays.	He delivered a great speech.	B1
230	demand	A strong request or need for something.	The job demands a lot of energy.	She demanded a refund.	B1
231	deserve	To be worthy of something due to actions or qualities.	You deserve a break.	He deserved the award.	B1
232	design	A plan or blueprint for creating something, or the process of making it.	She designed the logo.	That dress has a unique design.	B1
538	wander	To move without a fixed destination or purpose.	We wandered through the old town.	She loves to wander in nature.	B2
233	destroy	To damage something so badly that it no longer exists or functions.	The bomb destroyed the building.	Don't destroy your hard work.	B1
234	detail	A specific piece of information or a small part of something larger.	He explained every detail clearly.	The report is full of detail.	B1
235	develop	To grow, improve, or create something over time.	He developed a new app.	Children develop quickly.	B1
236	diet	The types of food a person regularly eats or a planned eating regimen.	She's on a healthy diet.	A balanced diet is important.	B1
237	discover	To find something new or learn something previously unknown.	He discovered a hidden path.	They discovered new species.	B1
238	divide	To separate something into parts or groups.	Let's divide the cake equally.	The wall divides the two gardens.	B1
239	doubt	A feeling of uncertainty or lack of belief in something.	I doubt he'll show up on time.	There's no doubt about her talent.	B1
240	drop	To let something fall or decrease suddenly.	Don't drop the glass!	Temperatures will drop overnight.	B1
241	employer	A person or company that hires workers.	Her employer gave her a bonus.	Employers value punctuality.	B1
242	encourage	To give support, confidence, or motivation to someone.	Parents should encourage their children.	She encouraged me to apply.	B1
243	entertain	To amuse or provide enjoyment for others.	The clown entertained the kids.	She entertains guests every weekend.	B1
244	essential	Absolutely necessary or extremely important.	Water is essential for life.	It's essential to follow instructions.	B1
245	exact	Completely correct, precise, or accurate.	That's the exact number I needed.	Be exact with your measurements.	B1
246	excite	To cause strong emotions of enthusiasm or happiness.	The idea excites me.	The news really excited her.	B1
247	expect	To believe something will happen or anticipate an outcome.	I expect him to arrive soon.	She's expecting a package today.	B1
248	explore	To investigate, travel through, or learn more about something.	Let's explore the city tomorrow.	They explored new business opportunities.	B1
249	extremely	To a very great degree.	She's extremely talented.	The food was extremely spicy.	B1
250	facility	A building or place designed for a specific purpose.	The facility includes a gym and pool.	This facility treats heart patients.	B1
251	focus	To concentrate attention on something specific.	Try to focus on your goals.	The main focus is education.	B1
252	forgive	To stop feeling anger towards someone for a mistake.	Please forgive my mistake.	She forgave him quickly.	B1
253	forward	In the direction of progress or ahead.	We look forward to your reply.	He took a step forward.	B1
254	freeze	To turn into ice or become very cold.	Water will freeze at zero degrees.	My computer keeps freezing.	B1
255	frequent	Happening often or at regular intervals.	He's a frequent traveler.	Frequent breaks improve productivity.	B1
256	frequently	Occurring often or regularly.	I visit that caf‚ frequently.	She frequently cheks her phone.	B1
257	further	To a greater extent or distance.	We'll discuss this further tomorrow.	She moved further down the road.	B1
258	future	The time that has yet to come.	He wants a better future for his kids.	The future of technology looks bright.	B1
259	generous	Willing to give more than is expected or necessary.	He's very generous with his time.	She gave a generous donation.	B1
260	gentle	Kind, soft, and mild in nature or behavior.	Be gentle with the kitten.	His voice was calm and gentle.	B1
261	glance	A brief or quick look at something.	He took a quick glance at the clock.	She glanced through the report.	B1
262	graduate	To complete a course of study and receive a degree or diploma.	He will graduate next year.	She's a law school graduate.	B1
263	guard	To protect or watch over something or someone.	A guard stood at the entrance.	You should guard your personal data.	B1
264	handle	To manage, control, or deal with something or a situation.	Can you handle the pressure?	She handled the situation well.	B1
265	hardly	Barely; only just; almost not.	I can hardly hear you.	She hardly ever eats sweets.	B1
266	historic	Important or significant in history.	They visited a historic monument.	It was a historic moment for the country.	B1
267	honest	Truthful, straightforward, and free from deceit.	Always be honest with yourself.	He gave an honest opinion.	B1
268	imagine	To form a mental picture or concept of something that isn't present.	Imagine a world without war.	I can't imagine living there.	B1
269	increase	To make something become greater in size, amount, or number.	Prices continue to increase.	We need to increase productivity.	B1
270	inform	To provide knowledge or information to someone.	Please inform us of any changes.	He informed me about the meeting.	B1
271	install	To set up or put something in place for use or operation.	We need to install new software.	He installed the air conditioner himself.	B1
272	intend	To have a purpose or plan for something.	I didn't intend to hurt you.	They intend to finish by Monday.	B1
273	invent	To create something new that has never existed before.	Who invented the telephone?	She loves to invent stories.	B1
274	involve	To include or make someone or something part of an activity or situation.	The project will involve several departments.	Don't involve yourself in their argument.	B1
275	join	To become a part of something by connecting or participating.	Would you like to join us for lunch?	She joined the company last year.	B1
276	label	A tag or name given to something to describe or categorize it.	Read the label before using the product.	Don't label people too quickly.	B1
277	lately	In the recent past; not long ago.	Have you seen him lately?	I've been very busy lately.	B1
278	limit	To restrict or set boundaries on something.	There's a limit to how much I can carry.	We need to limit screen time.	B1
279	local	Related to a specific area or community, often near where one lives.	I bought this at a local store.	The local community supported the event.	B1
280	locate	To find or determine the position of something.	Can you locate your keys?	The school is located downtown.	B1
281	manage	To handle, supervise, or control something or a situation.	Can you manage the project?	She managed her time wisely.	B1
282	method	A particular procedure or approach used to accomplish something.	What method did you use?	This is the best method for solving the problem.	B1
283	minimum	The smallest or least amount needed or allowed.	You need a minimum of two years' experience.	He met the minimum requirements.	B1
284	natural	Existing in nature or following natural processes, not artificial.	She prefers natural beauty products.	It's natural to feel nervous.	B1
285	notice	To become aware of or observe something.	Did you notice her new haircut?	The sign caught my notice.	B1
286	nowhere	Not in or at any place; not anywhere.	There's nowhere to park.	He disappeared into nowhere.	B1
287	obviously	In a way that is easily understood or seen; clearly.	Obviously, she was upset.	He was obviously surprised.	B1
288	organize	To arrange or put things in a structured, systematic order.	She will organize the event.	I need to organize my notes.	B1
289	original	Something that is unique or the first of its kind, not a copy.	This is an original painting.	Her idea was completely original.	B1
290	permit	To allow or give permission for something to happen.	You need a permit to park here.	Smoking is not permitted.	B1
291	personal	Relating to an individual's private life or personal feelings.	That's a personal question.	I keep a personal journal.	B1
292	positive	Favorable, optimistic, or confident; characterized by good qualities.	Stay positive, even in hard times.	Her attitude was very positive.	B1
293	predict	To say or estimate that something will happen in the future based on evidence or intuition.	Can you predict the outcome?	It's hard to predict the weather.	B1
294	prevent	To stop something from happening or to avoid a situation.	Vaccines help prevent disease.	He prevented the accident.	B1
295	produce	To create or make something, often as a result of work or effort.	Farmers produce fresh vegetables.	This factory produces cars.	B1
296	project	A planned activity or task that requires resources and effort to achieve a goal.	The team worked on a group project.	He projected confidence during the speech.	B1
297	proper	Correct, appropriate, or suitable according to the rules or standards.	Wear proper shoes for hiking.	That's not the proper way to speak.	B1
298	protect	To keep something or someone safe from harm, damage, or danger.	Sunscreen helps protect your skin.	Laws protect workers' rights.	B1
299	provide	To supply or make something available for use or need.	They provide free meals.	Can you provide more details?	B1
300	publish	To prepare and release content, such as books, articles, or websites, to the public.	She plans to publish her first novel this year.	The article was published in a top journal.	B1
301	puzzle	A problem or game that requires thought and creativity to solve.	This puzzle is very challenging.	His strange behavior puzzled everyone.	B1
302	quality	The standard or level of excellence, or the characteristic of something.	This restaurant is known for quality service.	They produce high-quality products.	B1
303	quite	To a considerable extent; fairly.	I'm quite happy with the results.	The book was quite interesting.	B1
304	raise	To lift or move something to a higher position, or to increase an amount or level.	They raised the flag at sunrise.	She got a raise at work.	B1
305	realize	To become fully aware or understand something clearly.	I didn't realize it was so late.	He suddenly realized the truth.	B1
306	recent	Happening or occurring not long ago; fresh in time.	The recent changes helped a lot.	I read a recent study on climate change.	B1
307	recently	In the near past; not long ago.	She recently moved to the city.	I haven't seen him recently.	B1
308	reduce	To make something smaller or less in amount, size, or degree.	We need to reduce waste.	She reduced her sugar intake.	B1
309	relax	To become less tense or anxious, or to unwind and take a break.	I like to relax on weekends.	Just relax and enjoy the moment.	B1
310	remain	To stay in the same place, state, or condition without changing.	Please remain seated.	Only a few cookies remain.	B1
311	remove	To take something away or eliminate it from a place or position.	Please remove your shoes.	She removed the stain from her shirt.	B1
312	reply	To respond or give an answer to a question or statement.	Did he reply to your message?	I replied as soon as I could.	B1
313	report	To give an account or description of an event, or to provide information formally.	The report is due tomorrow.	She reported the incident to HR.	B1
314	request	To ask for something politely or formally.	I'd like to request some time off.	Your request has been approved.	B1
315	research	To conduct a detailed study or investigation to discover facts or gather information.	She is doing research on renewable energy.	Research shows exercise improves health.	B1
316	respect	To regard something or someone with consideration and high regard.	I respect your opinion.	He earned their respect.	B1
317	result	The outcome or consequence of an action or event.	The result was better than expected.	Hard work results in success.	B1
318	search	To look carefully for something or to examine something thoroughly.	We had to search for a parking spot.	They are searching for a solution.	B1
319	select	To choose or pick something from a group of options.	Please select your favorite dish.	She was selected for the team.	B1
320	separate	To divide or set things apart from each other.	We should separate the documents into categories.	They decided to separate after five years.	B1
321	serious	Requiring careful thought or attention; not playful or trivial.	That's a serious problem we must address.	She has a serious look on her face.	B1
322	session	A period of time dedicated to a particular activity or event.	The yoga session lasted an hour.	We have a training session tomorrow.	B1
323	sleep	A natural state of rest where the body and mind rejuvenate.	I need more sleep.	He slept peacefully through the night.	B1
324	social	Relating to society, groups, or interacting with others.	She enjoys social events.	Social media has changed communication.	B1
325	solve	To find the answer to a problem or resolve a difficulty.	We need to solve this puzzle.	They worked together to solve the problem.	B1
326	success	The achievement of a goal or favorable outcome.	Hard work is the key to success.	She celebrated her success with family.	B1
327	suffer	To endure pain, hardship, or difficulty.	Many people suffer from allergies.	He suffered a serious injury during the game.	B1
328	suggest	To propose or recommend an idea or action.	I suggest we take a break.	She suggested a different route.	B1
329	system	A set of connected parts or elements that work together as a whole.	The computer system crashed.	We need a better filing system.	B1
330	thought	An idea or concept that has been considered or mentally processed.	She shared her thought about the proposal.	I thought you were coming later.	B1
331	topic	The subject or focus of a discussion, conversation, or piece of writing.	Today's topic is climate change.	Please stay on topic during the discussion.	B1
332	total	The complete amount or sum of something.	The total cost is $50.	We need the total number of participants.	B1
333	track	To follow or monitor the progress or location of something or someone.	The train is on the wrong track.	I lost track of time while reading.	B1
334	typical	Characteristic of a particular person, group, or thing; standard or expected.	It was a typical summer day.	He had a typical reaction to the news.	B1
335	universe	All of space and everything in it, including stars, planets, and galaxies.	The universe is vast and mysterious.	He dreams of exploring the universe.	B1
336	update	To make something more current or to provide new information.	Please update your contact information.	I'll update you on any changes.	B1
337	value	The worth, importance, or benefit of something.	I value your opinion.	The value of gold has increased.	B1
338	vehicle	A means of transportation, such as a car, bus, or bicycle.	That vehicle runs on electricity.	We rented a vehicle for the trip.	B1
339	vote	To express a choice or opinion in an election or decision-making process.	Did you vote in the election?	They voted on the new policy.	B1
340	weight	The measure of how heavy something is.	She lost a lot of weight after training.	Please check the weight limit before boarding.	B1
341	welcome	To greet someone with kindness and hospitality.	Welcome to our home!	The guests were given a warm welcome.	B1
342	whenever	At any time or every time that something happens.	Call me whenever you need help.	She visits her grandmother whenever possible.	B1
343	whether	A word used to introduce a question or alternative.	I don't know whether he will come.	Decide whether you want coffee or tea.	B1
344	whose	A possessive form used to ask about ownership or association.	Whose book is this?	I know a student whose book is excellent.	B1
345	wish	To hope for something or express a desire for it.	I wish you the best of luck.	Make a wish before you blow out the candles.	B1
346	wonder	A feeling of amazement or curiosity about something.	I wonder what he is thinking.	She was filled with wonder at the sight.	B1
347	workout	A session of physical exercise intended to improve health or fitness.	I do a workout every morning.	His workout routine is very intense.	B1
348	zone	An area or region designated for a particular purpose or characterized by certain features.	This area is a no-parking zone.	He entered a zone of deep concentration.	B1
349	abandon	To leave something or someone behind, often without intending to return or with a sense of finality.	She had to abandon the project due to lack of funding.	The crew made a quick decision to abandon the sinking ship.	B2
350	absolute	Something that is complete, total, and not subject to any conditions or limitations.	He demanded absolute silence during the presentation.	The king had absolute power over the kingdom.	B2
351	absorb	To take in or soak up a substance, knowledge, or information.	The sponge can absorb a lot of water.	Children easily absorb new languages at a young age.	B2
352	abstract	A concept or idea that is not grounded in physical reality, often theoretical or intellectual.	The museum displayed several pieces of abstract art.	Her explanation was too abstract for the audience to understand.	B2
353	accidental	Happening by chance, often unexpectedly or unintentionally.	The fire was caused by an accidental spark.	He made an accidental discovery during the experiment.	B2
354	according	In agreement with or in relation to something, often used to reference sources or principles.	According to the report, sales increased last quarter.	According to the weather forecast, it will rain tomorrow.	B2
355	acquire	To gain possession of something, either by effort or purchase.	He hopes to acquire new skills through the training program.	She acquired a taste for jazz music while studying abroad.	B2
356	activate	To make something active or start a process, system, or device.	Press this button to activate the alarm system. 	You need to activate your account before using the service.	B2
357	active	Engaged in action, movement, or activity, often characterized by energy, participation, or involvement.	He leads an active lifestyle with regular exercise.	The volcano has been active for several months.	B2
358	adapt	To modify something to fit new conditions or uses, often involving flexibility or adjustment.	It's important to adapt quickly to changing environments.	She adapted the novel into a screenplay.	B2
359	addition	The process of combining numbers or elements to form a sum, or something added to a whole.	In addition to math, she loves science.	The new addition to the house includes a sunroom.	B2
360	adjust	To change or modify something slightly in order to achieve a desired result or fit a particular condition.	He had to adjust the mirror before driving.	It took her a while to adjust to the new school.	B2
361	adopt	To take on or accept something, or to legally take a child as one's own.	They decided to adopt a child from abroad.	The company adopted a new policy last year.	B2
362	advance	To move forward or make progress in a particular area.	The army began to advance toward the enemy's position.	Medical technology has advanced rapidly in recent years.	B2
363	affect	To influence something or someone in a noticeable way, often causing change or reaction.	The weather can affect your mood.	The new law will affect small businesses.	B2
364	affection	A feeling of fondness, love, or warmth towards someone or something.	He showed great affection for his dog.	Children need love and affection to thrive.	B2
365	alter	To change or modify something, often in a small but significant way.	She had to alter her dress for the event.	The plan may alter depending on the weather.	B2
366	analysis	A detailed examination of something to understand its nature, structure, or meaning.	The report includes a detailed analysis of the data.	We need a deeper analysis before making a decision.	B2
367	analyze	To study or examine something carefully in order to understand it or draw conclusions.	Scientists analyze the results carefully.	Let's analyze what went wrong.	B2
368	appreciate	To recognize the value or importance of something, or to be thankful for it.	I appreciate your help with the project.	They appreciate good music and art.	B2
369	assist	To help or support someone in completing a task.	The nurse will assist the doctor during the surgery.	He offered to assist her with carrying the heavy boxes.	B2
370	assume	To accept something as true without proof, or to take on a role or responsibility.	I assume you've completed your assignment.	Don't assume things without evidence.	B2
371	assure	To guarantee or make someone feel confident about something.	I assure you everything will be fine.	She assured him that the package had been delivered.	B2
372	atmosphere	The air or mood surrounding a place or situation.	The restaurant had a cozy atmosphere.	Earth's atmosphere protects us from harmful rays.	B2
373	balance	A state of stability between opposing forces, or to keep something steady.	Yoga helps improve your balance and posture.	He struggled to balance work and family life.	B2
374	belong	To be a part of or connected to something.	These books belong on the top shelf.	He felt like he didn't belong there.	B2
375	betray	To be disloyal to someone by revealing secrets or acting against them.	He would never betray his friends.	She felt betrayed by his lies.	B2
376	boost	To increase, improve, or encourage something.	This ad campaign will boost our sales.	He needs a boost of confidence.	B2
377	bound	Tied or restricted, or moving in a specific direction with force.	We're bound to succeed if we keep trying.	The book is bound in leather.	B2
378	calculate	To determine something mathematically or carefully estimate an outcome.	Can you calculate the total cost?	The engineer calculated the pressure accurately.	B2
379	campus	The grounds and buildings of a school, university, or institution.	The university campus is huge.	They met while walking across campus.	B2
380	capable	Having the ability or skill to do something successfully.	She is capable of handling tough situations.	I know you're capable of much more.	B2
381	capture	To catch or take control of something, often by force or effort.	The photographer captured a beautiful sunset.	The police managed to capture the suspect.	B2
382	care	Concern for someone's well-being, or to take responsibility for something.	She takes good care of her plants.	I don't care what people say.	B2
383	charm	A quality that makes someone or something attractive or appealing.	She has a natural charm that attracts everyone.	The old house has a lot of charm.	B2
384	claim	To assert ownership or declare something as true.	He claimed the prize with excitement.	She claims she saw a UFO.	B2
385	classic	Timeless and high-quality, often representing the best of its kind.	That film is a classic.	He wore a classic black suit.	B2
386	client	A person or business that receives professional services.	The lawyer met with her client in the office.	We always prioritize client satisfaction.	B2
387	collapse	To fall apart, break down, or fail suddenly.	The bridge could collapse under pressure.	He collapsed from exhaustion.	B2
388	collide	To crash into something forcefully.	The two cars collided at the instersection.	Their ideas often collide during meetings.	B2
389	combine	To mix or unite different elements into one.	Combine the ingredients in a large bowl.	We need to combine our efforts to succeed.	B2
390	commit	To dedicate oneself to a task, cause, or responsibility.	He committed to finishing the project on time.	She committed a serious error in judgement.	B2
391	community	A group of people living in the same area or having common interests.	The community came together to help.	We're building a strong online community.	B2
392	compete	To strive against others to win or achieve something.	They'll compete in the national finals.	He loves to compete in video game tournaments.	B2
393	compose	To create or arrange something, such as music, writing, or ideas.	She composes music for films.	Take a moment to compose yourself.	B2
394	concept	An abstract idea or general understanding of something.	The concept of freedom is vital to democracy.	She introduced a new concept in her art.	B2
395	confuse	To make someone uncertain or unable to understand something clearly.	Don't confuse sugar with salt.	The intructions confused me.	B2
396	constant	Something that does not change or happens repeatedly.	She lives with constant pain.	He maintained a constant speed.	B2
397	construct	To build or assemble something from different parts.	They will construct a new library.	He constructed a model of the house.	B2
398	consume	To use up or eat something, often in large amounts.	Americans consume a lot of coffee.	The fire consumed the building quickly.	B2
399	continuous	Happening without interruption or stopping.	The machine runs in continuous cycles.	We experienced continuous rainfall for days.	B2
400	contrast	The difference between two or more things when compared.	There's a sharp contrast between the two styles.	The bright colors contrast with the dark background.	B2
401	contribute	To give or add something, such as effort, ideas, or resources.	She contributes to the school newspaper.	Everyone should contribute to the discussion.	B2
402	convert	To change something into a different form or purpose.	He converted the garage into a gym.	They converted dollars into euros.	B2
403	cooperate	To work together with others to achieve a goal.	The teams must cooperate to succeed.	He refused to cooperate with the investigation.	B2
404	current	Happening in the present time or a flow of water, air, or electricity.	What's your current address?	The river's current is strong.	B2
406	decline	To decrease in quality or quantity, or to refuse an offer.	Sales have declined this year.	She declined the invitation politely.	B2
407	define	To explain the meaning of a word, concept, or idea clearly.	Can you define that term?	Success is hard to define.	B2
408	delight	A feeling of great pleasure or happiness.	The gift brought her great delight.	I'm delighted to see you again!	B2
409	demonstrate	To show how something works or to prove something by example.	The teacher demonstrated how to solve it.	Protesters demonstrated outside the building.	B2
410	deny	To refuse to accept or admit something as true.	He denied the accusations.	Don't deny  your feelings.	B2
411	differ	To be unlike or distinct from something else.	Our opinions differ slightly.	Tastes differ from person to person.	B2
412	discard	To get rid of something that is no longer needed.	Discard the old papers.	She discarded the broken toy.	B2
413	distant	Far away in space or time.	They live in a distant village.	His voice sounded distant.	B2
414	distract	To take someone's attention away from something important.	Don't distract me while I'm working.	The noise distracted her from studying.	B2
415	disturb	To interrupt, bother, or upset someone or something.	Please don't disturb the wildlife.	He disturbed her while she was sleeping.	B2
416	domestic	Related to home, family, or one's own country.	They specialize in domestic flights.	She's a victim of domestic violence.	B2
417	dominate	To have control or power over something or someone.	He tends to dominate every conversation.	One company dominates the tech market.	B2
418	donate	To give something, especially money or goods, to help others.	She decided to donate blood.	They donated money to the hospital.	B2
419	dramatic	Intense, emotional, or exaggerated in nature.	The movie had a dramatic ending.	His reaction was overly dramatic.	B2
420	dynamic	Full of energy, constantly changing, or having strong movement.	She has a dynamic personality.	The market is very dynamic right now.	B2
421	educate	To teach or provide knowledge to someone.	Schools educate children from a young age.	They aim to educate people about recycling.	B2
422	emerge	To come into view or become known.	A leader will emerge in time.	The sun emerged from behind the clouds.	B2
423	enable	To make something possible or give someone the ability to do something.	This feature enables faster downloads.	Training will enable staff to work efficiently.	B2
424	enroll	To officially register or sign up for something.	He enrolled in a new course.	Students must enroll before the deadline.	B2
425	ensure	To make certain that something happens.	Please ensure all doors are locked.	We must ensure everyone is safe.	B2
426	establish	To set up or create something, such as a company or system.	They established a new company.	Trust takes time to establish.	B2
427	estimate	To make an approximate calculation or judgment about something.	What's your estimate for the cost?	They estimated the damage at $5,000.	B2
428	examine	To inspect or analyze something carefully.	The doctor will examine you now.	Let's examine the data more closely.	B2
429	expand	To grow, increase in size, or spread out.	The company plans to expand overseas.	Let's expand on that idea.	B2
430	expose	To reveal or uncover something that was hidden.	The report exposed corruption in the company.	Don't expose the film to sunlight.	B2
431	express	To communicate thoughts, emotions, or ideas clearly.	She expressed her feelings openly.	I'd like to express my gratitude.	B2
432	extreme	Very intense, beyond normal limits, or highly unusual.	They went hiking in extreme weather.	His opinion was a bit extreme.	B2
433	factor	An element that influences or contributes to an outcome.	Cost is a major factor in this decision.	Many factors influence success.	B2
434	feature	A distinctive characteristic or aspect of something.	The new phone features a better camera.	This article features local artists.	B2
435	finance	The management of money and financial resources.	She studied finance at university.	We need to finance the project somehow.	B2
436	flexible	Able to bend easily or adapt to change.	She has a flexible schedule.	Yoga keeps your body flexible.	B2
437	force	Physical power or pressure used to make something happen.	He used force to open the door.	The police had to use force.	B2
438	form	A particular shape, structure, or document.	Fill out this form, please.	Clouds began to form in the sky.	B2
439	fortune	A large amount of wealth or a stroke of luck.	She inherited a large fortune.	Fortune favors the bold.	B2
440	freedom	The ability to act or think without restrictions.	They fought for freedom.	Freedom of speech is essential.	B2
441	fulfill	To satisfy a requirement, goal, or expectation.	I hope to fulfill my dreams.	He fulfilled his promise to help.	B2
442	function	The purpose or role something serves.	This button doesn't function properly.	The main function of the lungs is to breathe.	B2
443	gather	To collect or bring things or people together.	Let's gather all the materials.	People gathered for the meeting.	B2
444	general	Broad, not specific, or applying to most cases.	In general, the movie was good.	The general mood was positive.	B2
445	generate	To produce or create something.	Solar panels generate electricity.	Her speech generated a lot of interest.	B2
446	genuine	Authentic, sincere, or real, not fake or artificial.	Her smile was genuine.	That's genuine leather bag.	B2
447	guarantee	A promise or assurance, often in writing, that something will happen or be of good quality.	I can't guarantee success.	This product comes with a guarantee.	B2
448	hesitate	To pause or be uncertain before taking action.	Don't hesitate to ask questions.	She hesitated before answering.	B2
449	however	In spite of that; nevertheless.	The task is difficult; however, it's not impossible.	She wanted to help: however, she was busy.	B2
450	identify	To recognize or determine the identity of something or someone.	Can you identify the suspect?	He was asked to identify himself.	B2
451	ignore	To deliberately pay no attention to something or someone.	Don't ignore the warning signs.	She ignored his advice.	B2
452	impact	The effect or influence that something has on something else.	The storm had a huge impact.	Education impacts your future.	B2
453	income	Money received for work, investments, or other sources.	His income increased last year.	She earns a steady income.	B2
454	industry	The production of goods or services within an economy or sector.	She works in the fashion industry.	The tech industry is growing fast.	B2
455	influence	The power to affect or shape outcomes or behavior.	Her speech influenced many people.	Media has a strong influence on society.	B2
456	initial	Referring to the beginning or first part of something.	The initial results were promising.	What's your initial reaction?	B2
457	inject	To introduce a substance into the body, often with a needle, or to introduce something into a situation.	The doctor injected the vaccine.	Try to inject some humor into your speech.	B2
458	inquire	To ask or seek information about something.	I'd like to inquire about your services.	He inquired about the price.	B2
459	inquiry	The act of asking for information or investigation into a matter.	The inquiry revealed the truth.	She made an inquiry at the front desk.	B2
460	inside	Within something; the inner part of something.	Stay inside during the storm.	There's something inside the box.	B2
461	inspire	To motivate or encourage someone to take action or feel creative.	Her story inspired me.	Good teachers inspire their students.	B2
462	interact	To engage or communicate with others in a meaningful way.	Children learn by interacting.	He interacts well with others.	B2
463	interpret	To explain or understand the meaning of something, often a message or text.	Can you interpret this data?	She interpreted his silence as anger.	B2
464	introduce	To present or make something known for the first time.	Let me introduce myself.	He introduced her to his parents.	B2
465	invest	To put money, time, or effort into something with the expectation of gaining a return.	They invested in real estate.	I want to invest in my education.	B2
466	investigate	To examine something carefully in order to uncover facts or understand it better.	The police will investigate the case.	We need to investigate further.	B2
467	isolate	To separate something or someone from others.	The patient was isolated to prevent infection.	Scientists isolated the virus for study.	B2
468	judge	To form an opinion about something or someone based on evidence or criteria.	Don't judge a book by its cover.	The judge announced the verdict.	B2
469	justice	The concept of fairness and the application of laws to ensure equality.	They demanded justice for the victims.	Justice must be served.	B2
470	justify	To give reasons or explanations that make something seem right or reasonable.	How can you justify your actions?	She tried to justify the expense.	B2
471	lead	To guide or direct a group, or to be at the front of something.	He will lead the team.	Too much lead in water is dangerous.	B2
472	maintain	To keep something in good condition or continue something over time.	It's hard to maintain focus.	They maintain the building regularly.	B2
473	manner	A way of doing something or behaving, often in a specific style or method.	He spoke in a polite manner.	Her manner was calm and confident.	B2
474	master	To become highly skilled or knowledgeable in a particular area.	He's a master of chess.	She mastered the new skill quickly.	B2
475	measure	To determine the size, amount, or degree of something using a standard.	Measure the length with a ruler.	They took measure to improve safety.	B2
476	mental	Relating to the mind or thinking processes.	She needs a mental break.	Mental health is important.	B2
477	midway	At or near the middle point.	They show started midway through dinner.	The park is located midway between the towns.	B2
478	monitor	To observe or check something regularly in order to track its progress or condition.	They monitor the baby at night.	A heart monitor tracks your pulse.	B2
479	navigate	To find one's way or direct a course through something.	He navigated through the forest.	I used GPS to navigate the city.	B2
480	network	A system of connections or relationships, often for sharing information or resources.	I have a strong professional network.	The internet network is down.	B2
481	objective	A goal or purpose that is intended to be achieved.	Our objective is to improve sales.	Try to remain objective during the discussion.	B2
482	observe	To watch carefully or notice details.	The students observed the experiment.	She observed the stars through a telescope.	B2
483	obtain	To get or acquire something, often by effort or request.	You must obtain permission first.	He obtrained a degree in science.	B2
484	occupy	To take up space or be in a particular place.	They occupy the corner office.	The kids were occupied with games.	B2
485	operate	To function or perform actions, especially in the context of machinery or business.	Doctors operate on patients every day.	The machine is easy to operate.	B2
486	oppose	To be against something or act in a way that challenges it.	They oppose the new policy.	He strongly opposed the idea.	B2
487	overlook	To fail to notice or consider something, or to look over something from a higher position.	Don't overlook the small details.	Her house overlooks the valley.	B2
488	participate	To take part or be involved in an activity or event.	He didn't participate in the discussion.	Everyone is encouraged to participate.	B2
489	passion	A strong, intense feeling of enthusiasm or love for something.	She has a passion for music.	Follow your passion in life.	B2
490	perform	To carry out a task, action, or role, especially in front of an audience.	The band will perform tonight.	She performed well in the test.	B2
491	potential	The possibility or capacity for future development or success.	She has great potential.	That idea has a lot of potential.	B2
492	preserve	To maintain something in its original state or protect it from harm or decay.	We must preserve our heritage.	This fruit is preserved in syrup.	B2
493	process	A series of actions or steps taken to achieve a particular end.	The process takes time.	Let me process that information.	B2
494	promote	To support, encourage, or advocate for something, or to advance someone's position or career.	They want to promote the new book.	She was promoted to manager.	B2
495	prove	To demonstrate the truth or validity of something through evidence or argument.	He proved his innocence.	Let's prove our theory.	B2
496	public	Relating to the community, government, or society at large, or something that is open to all.	This a public park.	The public responded positively.	B2
497	pursue	To actively seek or follow a goal, interest, or objective.	He decided to pursue a career in medicine.	Always pursue your dreams.	B2
498	rapid	Occurring quickly or at a high speed.	There was a rapid increase in sales.	The patient showed rapid improvement.	B2
499	react	To respond or act in reaction to something, often in an emotional or practical way.	How did he react to the news?	She reacted with surprise.	B2
500	recover	To return to a normal state after a loss, illness, or setback.	It took him weeks to recover from the flu.	The economy is beginning to recover.	B2
501	reflect	To think deeply about something, or to throw back light, heat, or sound.	The mirror reflects your image.	He reflected on his decisions.	B2
502	release	To set free, make something available, or allow it to be distributed.	They released the new album last week.	He was released from the hospital.	B2
503	resist	To withstand or oppose something, especially force or temptation.	I couldn't resist the chocolate cake.	They resisted the temptation.	B2
504	resource	A supply of materials, assets, or support that can be used to achieve goals.	Water is a vital natural resource.	This book is a great learning resource.	B2
505	respond	To reply or react to something or someone.	She didn't respond to my email.	Pleasae respond by Friday.	B2
506	restore	To bring something back to its original state or condition.	They restored the old house beautifully.	Peace was restored after the talks.	B2
507	review	To look over or examine something again, often for improvement or correction.	I need to review my notes.	The movie received great reviews.	B2
508	revise	To change or edit something to improve or update it.	I'll revise my essay tonight.	We need to revise the schedule.	B2
509	rotate	To turn something around a central point or axis.	The Earth rotates once every 24 hours.	Rotate the tires regularly for safety.	B2
510	sample	A small portion or example that represents a whole.	They gave us a free sample of the product.	I sampled the cake before buying it.	B2
511	satisfy	To meet the needs, desires, or expectations of someone.	Nothing could satisfy his curiosity.	The meal didn't satisfy my hunger.	B2
512	secure	To make something safe from danger, risk, or harm.	Make sure to secure the doors before leaving.	She secured a spot at the university.	B2
513	seldom	Rarely; not often.	He seldom visits his hometown.	We seldom see snow here.	B2
514	species	A group of organisms that share common characteristics and can reproduce with each other.	Scientists discovered new species of frog.	Many species are endangered.	B2
515	specific	Clearly defined or identified, distinct from general or vague.	Can you be more specific about the time?	I have a specific goal in mind.	B2
516	sponsor	To support, fund, or promote something or someone, usually in a business or event context.	The event was sponsored by several companies.	They found a sponsor for their trip.	B2
517	standard	A level of quality or expectation that is considered normal or acceptable.	The hotel offers rooms of a high standard.	It's standard practice to check IDs.	B2
518	strategy	A planned approach or method for achieving a specific goal.	We need a new marketing strategy.	Her strategy for studying really helped.	B2
519	structure	The arrangement or organization of parts that form a whole.	The building's structure is very modern.	Good structure is key in essay writing.	B2
520	support	To provide assistance, encouragement, or help to someone or something.	Thank you for your support during the project.	They supported their local team.	B2
521	surely	Without a doubt; certainly.	Surely you can't be serious!	The plan will surely succeed.	B2
522	symbol	An object, image, or sign that represents something else, often abstract.	The heart is a symbol of love.	The dove is often a symbol of peace.	B2
523	target	A specific goal, objective, or aim to reach.	They set a sales target for the quarter.	The marketing campaign targeted young adults.	B2
524	tension	A state of mental or emotional strain, or the physical stress on a material.	There was tension in the room during the debate.	Yoga helps reduce tension.	B2
525	tradition	A custom or practice that is passed down through generations.	It's a family tradition to meet every Christmas.	Traditions help connect generations.	B2
526	transfer	To move something from one place or person to another.	I need to transfer money to my account.	She transferred to a new university.	B2
527	treat	To provide someone with something enjoyable or beneficial, or to deal with an issue in a particular way.	I'll treat you to dinner tonight.	Doctors treat many illnesses daily.	B2
528	trigger	An event or action that causes a specific response or reaction.	Loud noises can trigger anxiety.	The fire alarm triggered an evacuation.	B2
529	turn	To rotate or change direction, or to change a condition or state.	Turn left at the next light.	It's your turn to speak.	B2
530	unique	Being the only one of its kind; distinct or special.	Every snowflake is unique.	She has a unique sense of style.	B2
531	upgrade	To improve or raise the quality or performance of something.	I need to upgrade my laptop.	The hotel upgraded our room for free.	B2
532	upset	To disturb or cause emotional distress; to overturn or disrupt something.	She was upset about the delay.	Losing the game really upset him.	B2
533	version	A specific edition or form of something, often different from others.	This is the latest version of the app.	I prefer the original version of the song.	B2
534	virtual	Existing in essence or effect, but not in physical form; simulated by a computer.	We had a virtual meeting yesterday.	Virtual reality is becoming more popular.	B2
535	visible	Able to be seen or observed.	The mountains are visible from here.	The stain was barely visible.	B2
536	volume	The amount of space that something occupies, or the level of sound.	Turn down the volume, please.	The volume of traffic increases during rush hour.	B2
537	volunteer	A person who offers their services or time without being paid.	I volunteer at the animal shelter.	They volunteered to help with the event.	B2
539	whom	A formal pronoun used to refer to the object of a verb or preposition.	To whom should I address the letter?	Whom did you meet yesterday?	B2
540	witness	A person who sees an event or action happen and can testify about it.	The witness testified in court.	I was a witness to the accident.	B2
541	youth	The period of life between childhood and adulthood, or young people in general.	Youth is a time of great energy.	The youth of today are very tech-savvy.	B2
542	zebra	A black-and-white striped herbivorous animal found in Africa, related to horses.	The zebra has black and white stripes.	We saw zebra at the zoo.	B2
543	accelerate	To increase the speed or rate of something, such as a process or movement.	The car can accelerate from 0 to 60 mph in five seconds.	Efforts to accelerate the construction process were successful.	C1
544	accomplish	To successfully complete a task or goal.	He managed to accomplish all his goals this year.	With hard work, you can accomplish anything.	C1
545	affiliate	An individual or organization that is officially connected or associated with a larger entity.	The local station is an affiliate of the national network.	Our company is affiliated with several international partners.	C1
546	affirm	To confirm or state something as true or valid, often in a positive or supportive manner.	He affirmed his commitment to the project.	She nodded to affirm that she understood.	C1
547	alert	Aware and attentive to potential danger or important information, or a warning signal indicating urgency.	The guard remained alert during his shift.	An alert was issued for severe weather conditions.	C1
548	allocate	To distribute or assign resources, tasks, or responsibilities for a specific purpose.	The company will allocate more funds to research.	We need to allocate our resources wisely.	C1
549	anticipate	To expect or predict something in advance and prepare for it.	We anticipate a large crowd at the event.	She didn't anticipate the difficulty of the task.	C1
550	appoint	To officially assign someone to a role or position.	The president will appoint a new ambassador.	She was appointed as team leader.	C1
551	clarify	To make something clearer or easier to understand.	Can you clarify your last point?	The teacher clarified the assignment instructions.	C1
552	collaborate	To work together with others towards a common goal.	The two artists collaborated on a mural.	We need to collaborate more effectively.	C1
553	concern	A feeling of worry or interest about something important.	His main concern is safety.	She was concerned about the delay.	C1
554	conclude	To bring something to an end or reach a decision based on reasoning.	Let's conclude the meeting with final remarks.	They concluded that more research was needed.	C1
555	conquer	To overcome or take control of something, often by force.	The army planned to conquer the territory.	She conquered her fear of heights.	C1
556	consult	To seek advice or guidance from someone knowledgeable.	Consult your doctor before taking medicine.	She consulted a lawyer about the issue.	C1
557	corporate	Related to businesses or large organizations.	She works in a lagre corporate office.	The corporate world can be very competitive.	C1
558	determine	To decide or establish something based on facts or reasoning.	We need to determine the cause.	Her efforts determined the outcome.	C1
559	diminish	To make something smaller, weaker, or less important.	His power has diminished over time.	The pain gradually dimished.	C1
560	domain	An area of knowledge, activity, or control, or a website address.	This issue falls outside my domain.	The website has a new domain name.	C1
561	eliminate	To remove or get rid of something completely.	We must eliminate all errors.	Sugar was eliminated from her diet.	C1
562	enforce	To make sure laws or rules are followed.	The police enforce the law.	Rules must be enforced fairly.	C1
563	engage	To take part in or become involved in something.	The video really engaged the audience.	Try to engage with your classmates.	C1
564	enhance	To improve or make something better.	We used filters to enhance the photo.	Exercise can enhance your mood.	C1
565	evaluate	To assess or judge the value, quality, or effectiveness of something.	We need to evaluate the results.	The teacher evaluated each essay.	C1
566	evolve	To gradually change or develop over time.	Species evolve over time.	Her ideas evolved with experience.	C1
567	exceed	To go beyond a certain limit or expectation.	Sales exceeded expectations.	Don't exceed the speed limit.	C1
568	exclude	To leave out or prevent someone or something from being included.	You can't exclude him from the group.	The price excludes tax.	C1
569	federal	Relating to a central government.	The federal government passed a new law.	He works for a federal agency.	C1
570	finalize	To complete or make something final and official.	Let's finalize the schedule today.	They finalized the deal yesterday.	C1
571	formal	Following official or traditional rules and customs.	He wore a formal suit.	This is a formal invitation.	C1
572	format	The arrangement or structure of something, especially documents or media.	The text is in PDF format.	Please format the document properly.	C1
573	hazard	A potential danger or risk.	Wet floors are a safety hazard.	Smoking is a health hazard.	C1
574	insert	To place something into a space or position.	Please insert your card.	He inserted a coin into the slot.	C1
575	insight	A deep understanding or clear perception of something.	Her book provides deep insight.	He offered valuable insight into the issue.	C1
576	inspect	To look at something carefully to examine its condition or quality.	The car was inspected for damage.	They inspect the factory monthly.	C1
577	launch	To start or initiate something, like a product or a project.	The company will launch a new product.	The rocket launch was successful.	C1
578	liberal	Open-minded, progressive, or favoring change and reform.	He holds liberal political views.	The policy allows for a liberal interpretation.	C1
579	modify	To change or alter something, usually to improve it or make it more suitable.	You can modify the settings here.	She modified her diet for health reasons.	C1
580	motivate	To encourage or inspire someone to take action or achieve something.	What motivates you to succeed?	The coach motivated the team.	C1
581	negotiate	To discuss and reach an agreement on terms or conditions.	They negotiated a new contract.	Let's negotiate the price.	C1
582	notify	To inform or give notice about something to someone.	Please notify me of any updates.	He was notified by email.	C1
583	official	Authorized by a recognized authority or related to formal procedures.	It's not official yet.	The official made the announcement.	C1
584	outcome	The result or consequence of an action or event.	The outcome was unexpected.	We're waiting for the final outcome.	C1
585	perceive	To become aware of or understand something through the senses or the mind.	How do you perceive success?	I perceived a hint of sadness in her voice.	C1
586	proceed	To continue with an action or process after a pause or delay.	You may now proceed.	He proceeded without hesitation.	C1
587	relate	To show or establish a connection between things or people.	I can relate to your experience.	The book relates to history.	C1
588	resolve	To find a solution to a problem or make a firm decision.	They resolved the issue quickly.	I hope to resolve the conflict soon.	C1
589	retain	To keep or continue to have something.	It's hard to retain all this information.	He retained control of the company.	C1
590	scarcely	Barely; only just; hardly.	I could scarcely believe my eyes.	He had scarcely finished speaking when she interrupted.	C1
591	sequence	A specific order in which things happen or are arranged.	The movie's opening sequence was stunning.	Please follow the sequence of instructions.	C1
592	simplify	To make something easier to understand or less complex.	Let's simplify the process.	He simplified the explanation for the children.	C1
593	stable	Steady, secure, or unlikely to change in an unpredictable way.	The economy is finally stable again.	The horse was kept in a stable.	C1
594	thrive	To grow or develop vigorously, often in favorable conditions.	Some plants thrive in desert conditions.	She thrives in competitive environment.	C1
595	unite	To bring things or people together to form a single entity.	We must unite for the cause.	The two companies united last year.	C1
596	utilize	To make practical or effective use of something.	We need to utilize all available resources.	She utilized her time wisely.	C1
597	verify	To confirm the accuracy or truth of something.	Please verify your email address.	The accountant verified the financial report.	C1
598	amend	To make minor changes or improvements to something, often to correct or update it.	Congress voted to amend the constitution.	She decided to amend her earlier statement.	C2
599	assemble	To bring together parts or people into a whole.	The team will assemble at 9 a.m. sharp.	We need to assemble the parts before testing.	C2
600	blend	To mix things together to create a unified whole.	Blend the ingredients until smooth.	Her voice blends beautifully with the choir.	C2
601	disorder	A lack of order, organization, or a medical condition.	He was diagnosed with a sleep disorder.	The room was in total disorder.	C2
602	execute	To carry out a task or plan effectively.	The plan was executed perfectly.	The program will execute the command.	C2
603	fundamental	Basic or essential to the core of something.	Honesty is a fundamental value.	We need to understand the fundamental principles.	C2
604	hinder	To slow down, delay, or prevent progress or action.	Poor lighting can hinder progress.	His injury hindered his performance.	C2
605	inherit	To receive something, usually money or property, from someone after their death.	She inherited her grandmother's jewelry.	He inherited his father's business.	C2
606	initiate	To start or begin something.	They initiated a new project.	He initiated the conversation.	C2
607	likewise	In the same way; similarly.	She smiled, and he did likewise.	I enjoyed the meal; likewise, the service was excellent.	C2
608	sustain	To maintain or continue something over time, especially support or resources.	It's hard to sustain that level of energy.	They sustained serious damage during the storm.	C2
609	yield	To produce or give in return, or to surrender or give way to something.	Please yield to oncoming traffic.	Hard work will yield good results.	C2
\.


--
-- Name: user_words_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_words_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: words_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.words_id_seq', 609, true);


--
-- Name: user_words user_words_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_words
    ADD CONSTRAINT user_words_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: words words_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.words
    ADD CONSTRAINT words_pkey PRIMARY KEY (id);


--
-- Name: user_words user_words_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_words
    ADD CONSTRAINT user_words_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_words user_words_word_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_words
    ADD CONSTRAINT user_words_word_id_fkey FOREIGN KEY (word_id) REFERENCES public.words(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

