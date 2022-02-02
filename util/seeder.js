const mongoose = require("mongoose");
const Submission = require("../models/Submission");
const User = require("../models/User");

const mongoURI =
	"mongodb+srv://iglooDevelopment:ff040b5f8a0bcf8584bc@development.vnngi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const poemSeedArray = [
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "Ozymandias",
		body: "I met a traveller from an antique land \r\n Who said: Two vast and trunkless legs of stone \r\n Stand in the desert. Near them, on the sand, \r\n Half sunk, a shattered visage lies, whose frown, \r\n And wrinkled lip, and sneer of cold command, \r\n Tell that its sculptor well those passions read \r\n Which yet survive, stamped on these lifeless things, \r\n The hand that mocked them and the heart that fed. \r\n And on the pedestal these words appear — \r\n'My name is Ozymandias, king of kings: \r\n Look on my works, ye Mighty, and despair!'",
		tags: ["Percy Shelley"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "Fire & Ice",
		body: "Some say the world will end in fire, \r\n Some say in ice. From what I’ve tasted of desire \r\n I think I know enough of hate \r\n To say that for destruction ice \r\n Is also great \r\n And would suffice.",
		tags: ["Robert Frost"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "I heard a fly buzz when I died",
		body: "I heard a Fly buzz – when I died – The Stillness in the Room \r\n Was like the Stillness in the Air – \r\n Between the Heaves of Storm – \r\n The Eyes around – had wrung them dry – \r\n And Breaths were gathering firm \r\n For that last Onset – when the King \r\n Be witnessed – in the Room – \r\n I willed my Keepsakes – Signed away \r\n What portion of me be \r\n Assignable – and then it was \r\n There interposed a Fly – \r\n With Blue – uncertain – stumbling Buzz – \r\n Between the light – and me – \r\n And then the Windows failed – and then \r\n I could not see to see –",
		tags: ["Emily Dickinson"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "Shall I Compare Thee To A Summer’s Day?",
		body: "Shall I compare thee to a summer’s day? Thou art more lovely and more temperate. \r\n Rough winds do shake the darling buds of May, \r\n And summer’s lease hath all too short a date. \r\n Sometime too hot the eye of heaven shines, \r\n And often is his gold complexion dimmed; \r\n And every fair from fair sometime declines, \r\n By chance, or nature’s changing course, untrimmed; \r\n But thy eternal summer shall not fade, \r\n Nor lose possession of that fair thou ow’st, \r\n Nor shall death brag thou wand’rest in his shade, \r\n When in eternal lines to Time thou grow’st. \r\n So long as men can breathe, or eyes can see, \r\n So long lives this, and this gives life to thee.",
		tags: ["William Shakespeare"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "So Tired Blues",
		body: "With the sun in my hand Gonna throw the sun \r\n Way across the land- \r\n Cause I’m tired, \r\n Tired as I can be",
		tags: ["Langston Hughes"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "A Dream Within A Dream",
		body: "Take this kiss upon the brow! And, in parting from you now, \r\n Thus much let me avow- \r\n You are not wrong, who deem \r\n That my days have been a dream; \r\n Yet if hope has flown away \r\n In a night, or in a day, \r\n In a vision, or in none, \r\n Is it therefore the less gone? \r\n All that we see or seem \r\n Is but a dream within a dream. \r\n I stand amid the roar \r\n Of a surf-tormented shore, \r\n And I hold within my hand \r\n Grains of the golden sand- \r\n How few! yet how they creep \r\n Through my fingers to the deep, \r\n While I weep- while I weep! \r\n O God! can I not grasp \r\n Them with a tighter clasp? \r\n O God! can I not save \r\n One from the pitiless wave? \r\n Is all that we see or seem \r\n But a dream within a dream?",
		tags: ["Edgar Allan Poe"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "No Man Is An Island",
		body: "No man is an island, Entire of itself, \r\n Every man is a piece of the continent, \r\n A part of the main. \r\n If a clod be washed away by the sea, \r\n Europe is the less. \r\n As well as if a promontory were. \r\n As well as if a manor of thy friend’s \r\n Or of thine own were: \r\n Any man’s death diminishes me, \r\n Because I am involved in mankind, \r\n And therefore never send to know for whom the bell tolls; \r\n It tolls for thee.",
		tags: ["John Donne"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "A Word To Husbands",
		body: "To keep your marriage brimming With love in the loving cup, \r\n Whenever you’re wrong, admit it; \r\n Whenever you’re right, shut up.",
		tags: ["Ogden Nash"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "Housekeeping",
		body: "We mourn the broken things, chair legs wrenched from their seats, chipped plates, \r\n the threadbare clothes. We work the magic \r\n of glue, drive the nails, mend the holes. \r\n We save what we can, melt small pieces \r\n of soap, gather fallen pecans, keep neck bones \r\n for soup. Beating rugs against the house, \r\n we watch dust, lit like stars, spreading \r\n across the yard. Late afternoon, we draw \r\n the blinds to cool the rooms, drive the bugs \r\n out. My mother irons, singing, lost in reverie. \r\n I mark the pages of a mail-order catalog, \r\n listen for passing cars. All-day we watch \r\n for the mail, some news from a distant place",
		tags: ["Natasha Tretheway"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "This Is Just To Say",
		body: "I have eaten the plums \r\n that were in \r\n the icebox \r\n and which \r\n you were probably \r\n saving \r\n for breakfast \r\n Forgive me \r\n they were delicious \r\n so sweet \r\n and so cold",
		tags: ["William Carlos Williams"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "Green Eggs & Ham",
		body: "I do not like them in a box I do not like them with a fox \r\n I do not like them in a house \r\n I do not like them with a mouse \r\n I do not like them here or there \r\n I do not like them anywhere \r\n I do not like green eggs and ham \r\n I do not like them Sam I am",
		tags: ["Dr. Seuss"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "If You Forget Me",
		body: "I want you to know \r\n one thing. \r\n You know how this is: \r\n if I look \r\n at the crystal moon, at the red branch \r\n of the slow autumn at my window, \r\n if I touch \r\n near the fire \r\n the impalpable ash \r\n or the wrinkled body of the log, \r\n everything carries me to you, \r\n as if everything that exists, \r\n aromas, light, metals, \r\n were little boats \r\n that sail \r\n toward those isles of yours that wait for me. \r\n Well, now, \r\n if little by little you stop loving me \r\n I shall stop loving you little by little. \r\n If suddenly \r\n you forget me \r\n do not look for me, \r\n for I shall already have forgotten you. \r\n If you think it long and mad, \r\n the wind of banners \r\n that passes through my life, \r\n and you decide \r\n to leave me at the shore \r\n of the heart where I have roots, \r\n remember \r\n that on that day, \r\n at that hour, \r\n I shall lift my arms \r\n and my roots will set off \r\n to seek another land. \r\n But \r\n if each day, \r\n each hour, \r\n you feel that you are destined for me \r\n with implacable sweetness, \r\n if each day a flower \r\n climbs up to your lips to seek me, \r\n ah my love, ah my own, \r\n in me all that fire is repeated, \r\n in me nothing is extinguished or forgotten, \r\n my love feeds on your love, beloved, \r\n and as long as you live it will be in your arms \r\n without leaving mine. \r\n",
		tags: ["Pablo Neruda"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "Trees",
		body: "I think that I shall never see A poem lovely as a tree. \r\n A tree whose hungry mouth is prest \r\n Against the earth’s sweet flowing breast; \r\n A tree that looks at God all day, \r\n And lifts her leafy arms to pray; \r\n A tree that may in summer wear \r\n A nest of robins in her hair; \r\n Upon whose bosom snow has lain; \r\n Who intimately lives with rain. \r\n Poems are made by fools like me, \r\n But only God can make a tree. \r\n",
		tags: ["Joyce Kilmer"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "Love After Love",
		body: "The time come when, with elation \r\n you will greet yourself arriving \r\n at your own door, in your own mirror \r\n and each will smile at the other’s welcome, \r\n and say, sit here. Eat. \r\n You will love again the stranger who was your self. \r\n Give wine. Give bread. Give back your heart \r\n to itself, to the stranger who has loved you \r\n all your life, whom you ignored \r\n for another, who knows you by heart. \r\n Take down the love letters from the bookshelf, \r\n the photographs, the desperate notes, \r\n peel your own image from the mirror. \r\n Sit. Feast on your life.",
		tags: ["Derek Walcott"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "A Red, Red, Rose",
		body: "O my Luve is like a red, red rose That’s newly sprung in June;\r\n O my Luve is like the melody\r\n That’s sweetly played in tune.\r\n \r\n So fair art thou, my bonnie lass,\r\n So deep in luve am I;\r\n And I will luve thee still, my dear,\r\n Till a’ the seas gang dry.\r\n \r\n Till a’ the seas gang dry, my dear,\r\n And the rocks melt wi’ the sun;\r\n I will love thee still, my dear,\r\n While the sands o’ life shall run.\r\n \r\n And fare thee weel, my only luve!\r\n And fare thee weel awhile!\r\n And I will come again, my luve,\r\n Though it were ten thousand mile.",
		tags: ["Robert Burn"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "How To Get There",
		body: "Go to the end of the path until you get to the gate. Go through the gate and head straight out towards the horizon. \r\n Keep going towards the horizon. \r\n Sit down and have a rest every now and again, \r\n But keep on going, just keep on with it. \r\n Keep on going as far as you can. \r\n That’s how you get there.",
		tags: ["Leunig"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "Metaphors",
		body: "I’m a riddle in nine syllables, An elephant, a ponderous house, \r\n A melon strolling on two tendrils. \r\n O red fruit, ivory, fine timbers! \r\n This loaf’s big with its yeasty rising. \r\n Money’s new-minted in this fat purse. \r\n I’m a means, a stage, a cow in calf. \r\n I’ve eaten a bag of green apples, \r\n Boarded the train there’s no getting off.",
		tags: ["Sylvia Plath"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "Risk",
		body: "And then the day came, when the risk \r\n to remain tight \r\n in a bud \r\n was more painful \r\n than the risk \r\n it took \r\n to blossom.",
		tags: ["Anais Nin"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "Stopping By Woods On A Snowy Evening",
		body: "Whose woods these are I think I know. His house is in the village though; \r\n He will not see me stopping here \r\n To watch his woods fill up with snow. \r\n My little horse must think it queer \r\n To stop without a farmhouse near \r\n Between the woods and frozen lake \r\n The darkest evening of the year. \r\n He gives his harness bells a shake \r\n To ask if there is some mistake. \r\n The only other sound’s the sweep \r\n Of easy wind and downy flake. \r\n The woods are lovely, dark and deep, \r\n But I have promises to keep, \r\n And miles to go before I sleep, \r\n And miles to go before I sleep.",
		tags: ["Robert Frost"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "Still I Rise",
		body: "You may write me down in history With your bitter, twisted lies, \r\n You may tread me in the very dirt \r\n But still, like dust, I’ll rise. \r\n Does my sassiness upset you? \r\n Why are you beset with gloom? \r\n ’Cause I walk like I’ve got oil wells \r\n Pumping in my living room. \r\n Just like moons and like suns, \r\n With the certainty of tides, \r\n Just like hopes springing high, \r\n Still I’ll rise. \r\n Did you want to see me broken? \r\n Bowed head and lowered eyes? \r\n Shoulders falling down like teardrops. \r\n Weakened by my soulful cries. \r\n Does my haughtiness offend you? \r\n Don’t you take it awful hard \r\n ’Cause I laugh like I’ve got gold mines \r\n Diggin’ in my own back yard. \r\n You may shoot me with your words, \r\n You may cut me with your eyes, \r\n You may kill me with your hatefulness, \r\n But still, like air, I’ll rise. \r\n Does my sexiness upset you? \r\n Does it come as a surprise \r\n That I dance like I’ve got diamonds \r\n At the meeting of my thighs? \r\n Out of the huts of history’s shame \r\n I rise \r\n Up from a past that’s rooted in pain \r\n I rise \r\n I’m a black ocean, leaping and wide, \r\n Welling and swelling I bear in the tide. \r\n Leaving behind nights of terror and fear \r\n I rise \r\n Into a daybreak that’s wondrously clear \r\n I rise \r\n Bringing the gifts that my ancestors gave, \r\n I am the dream and the hope of the slave. \r\n I rise \r\n I rise \r\n I rise. \r\n",
		tags: ["Maya Angelou"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "There Will Come Soft Rain",
		body: "There will come soft rain and the smell of the ground, And swallows circling with their shimmering sound; \r\n And frogs in the pools singing at night, \r\n And wild plum trees in tremulous white; \r\n Robins will wear their feathery fire, \r\n Whistling their whims on a low fence-wire; \r\n And not one will know of the war, not one \r\n Will care at last when it is done. \r\n Not one would mind, neither bird nor tree, \r\n If mankind perished utterly; \r\n And Spring herself, when she woke at dawn \r\n Would scarcely know that we were gone.",
		tags: ["Sara Teasdale"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "O Captain! My Captain!",
		body: "O Captain! my Captain! our fearful trip is done; The ship has weather’d every rack, the prize we sought is won; \r\n The port is near, the bells I hear, the people all exulting, \r\n While follow eyes the steady keel, the vessel grim and daring: \r\n But O heart! heart! heart! \r\n O the bleeding drops of red, \r\n Where on the deck my Captain lies, \r\n Fallen cold and dead. \r\n O Captain! my Captain! rise up and hear the bells; \r\n Rise up — for you the flag is flung — for you the bugle trills; \r\n For you bouquets and ribbon’d wreaths — for you the shores a-crowding; \r\n For you they call, the swaying mass, their eager faces turning; \r\n Here Captain! dear father! \r\n This arm beneath your head; \r\n It is some dream that on the deck, \r\n You’ve fallen cold and dead. \r\n My Captain does not answer, his lips are pale and still; \r\n My father does not feel my arm, he has no pulse nor will; \r\n The ship is anchor’d safe and sound, its voyage closed and done; \r\n From fearful trip, the victor ship, comes in with object won; 20 \r\n Exult, O shores, and ring, O bells! \r\n But I, with mournful tread, \r\n Walk the deck my Cptain lies, \r\n Fallen cold and dead. \r\n",
		tags: ["Walt Whitman"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "The Road Not Taken",
		body: "Two roads diverged in a yellow wood, And sorry I could not travel both \r\n And be one traveler, long I stood \r\n And looked down one as far as I could \r\n To where it bent in the undergrowth; \r\n Then took the other, as just as fair, \r\n And having perhaps the better claim \r\n Because it was grassy and wanted wear, \r\n Though as for that the passing there \r\n Had worn them really about the same, \r\n And both that morning equally lay \r\n In leaves no step had trodden black. \r\n Oh, I kept the first for another day! \r\n Yet knowing how way leads on to way \r\n I doubted if I should ever come back. \r\n I shall be telling this with a sigh \r\n Somewhere ages and ages hence: \r\n Two roads diverged in a wood, and I, \r\n I took the one less traveled by, \r\n And that has made all the difference. \r\n",
		tags: ["Robert Frost"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "Dreams",
		body: "Hold fast to dreams For if dreams die \r\n Life is a broken-winged bird \r\n That cannot fly. \r\n Hold fast to dreams \r\n For when dreams go \r\n Life is a barren field \r\n Frozen with snow.",
		tags: ["Langston Hughes"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "If",
		body: "If you can keep your head when all about you Are losing theirs and blaming it on you; \r\n If you can trust yourself when all men doubt you, \r\n But make allowance for their doubting too: \r\n If you can wait and not be tired by waiting, \r\n Or, being lied about, don’t deal in lies, \r\n Or being hated don’t give way to hating, \r\n And yet don’t look too good, nor talk too wise; \r\n If you can dream- -and not make dreams your master; \r\n If you can think- -and not make thoughts your aim, \r\n If you can meet with Triumph and Disaster \r\n And treat those two impostors just the same:. \r\n If you can bear to hear the truth you’ve spoken \r\n Twisted by knaves to make a trap for fools, \r\n Or watch the things you gave your life to, broken, \r\n And stoop and build’em up with worn-out tools; \r\n If you can make one heap of all your winnings \r\n And risk it on one turn of pitch-and-toss, \r\n And lose, and start again at your beginnings, \r\n And never breathe a word about your loss: \r\n If you can force your heart and nerve and sinew \r\n To serve your turn long after they are gone, \r\n And so hold on when there is nothing in you \r\n Except the Will which says to them: ‘Hold on! ‘ \r\n If you can talk with crowds and keep your virtue, \r\n Or walk with Kings- -nor lose the common touch, \r\n If neither foes nor loving friends can hurt you, \r\n If all men count with you, but none too much: \r\n If you can fill the unforgiving minute \r\n With sixty seconds’ worth of distance run, \r\n Yours is the Earth and everything that’s in it, \r\n And- -which is more- -you’ll be a Man, my son! \r\n",
		tags: ["Rudyard Kipling"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "Remember",
		body: "Remember me when I am gone away, Gone far away into the silent land; \r\n When you can no more hold me by the hand, \r\n Nor I half turn to go yet turning stay. \r\n Remember me when no more day by day \r\n You tell me of our future that you plann’d: \r\n Only remember me; you understand \r\n It will be late to counsel then or pray. \r\n Yet if you should forget me for a while \r\n And afterwards remember, do not grieve: \r\n For if the darkness and corruption leave \r\n A vestige of the thoughts that once I had, \r\n Better by far you should forget and smile \r\n Than that you should remember and be sad.",
		tags: ["Christina Georgina Rossetti"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "A Fairy Song",
		body: "Over hill, over dale, Thorough bush, thorough brier, \r\n Over park, over pale, \r\n Thorough flood, thorough fire! \r\n I do wander everywhere, \r\n Swifter than the moon’s sphere; \r\n And I serve the Fairy Queen, \r\n To dew her orbs upon the green; \r\n The cowslips tall her pensioners be; \r\n In their gold coats spots you see; \r\n Those be rubies, fairy favours; \r\n In those freckles live their savours; \r\n I must go seek some dewdrops here, \r\n And hang a pearl in every cowslip’s ear.",
		tags: ["William Shakespeare"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "Do Not Stand At My Grave And Weep",
		body: "Do not stand at my grave and weep \r\n I am not there. I do not sleep. \r\n I am a thousand winds that blow. \r\n I am the diamond glints on snow. \r\n I am the sunlight on ripened grain. \r\n I am the gentle autumn rain. \r\n When you awaken in the morning’s hush \r\n I am the swift uplifting rush \r\n Of quiet birds in circled flight. \r\n I am the soft stars that shine at night. \r\n Do not stand at my grave and cry; \r\n I am not there. I did not die.",
		tags: ["Mary Elizabeth Frye"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "I Do Not Love You Except Because I Love You",
		body: "I do not love you except because I love you; I go from loving to not loving you, \r\n From waiting to not waiting for you \r\n My heart moves from cold to fire. \r\n I love you only because it’s you the one I love; \r\n I hate you deeply, and hating you \r\n Bend to you, and the measure of my changing love for you \r\n Is that I do not see you but love you blindly. \r\n Maybe January light will consume \r\n My heart with its cruel \r\n Ray, stealing my key to true calm. \r\n In this part of the story I am the one who \r\n Dies, the only one, and I will die of love because I love you, \r\n Because I love you, Love, in fire and blood.",
		tags: ["Pablo Neruda"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "How Do I Love Thee?",
		body: "How do I love thee? Let me count the ways. I love thee to the depth and breadth and height \r\n My soul can reach, when feeling out of sight \r\n For the ends of Being and ideal Grace. \r\n I love thee to the level of every day’s \r\n Most quiet need, by sun and candlelight. \r\n I love thee freely, as men strive for Right; \r\n I love thee purely, as they turn from Praise. \r\n I love with a passion put to use \r\n In my old griefs, and with my childhood’s faith. \r\n I love thee with a love I seemed to lose \r\n With my lost saints, — I love thee with the breath, \r\n Smiles, tears, of all my life! — and, if God choose, \r\n I shall but love thee better after death.",
		tags: ["Elizabeth Barrett Browning"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "Invictus",
		body: "Out of the night that covers me, Black as the Pit from pole to pole, \r\n I thank whatever gods may be \r\n For my unconquerable soul. \r\n In the fell clutch of circumstance \r\n I have not winced nor cried aloud. \r\n Under the bludgeonings of chance \r\n My head is bloody, but unbowed. \r\n Beyond this place of wrath and tears \r\n Looms but the Horror of the shade, \r\n And yet the menace of the years \r\n Finds, and shall find, me unafraid. \r\n It matters not how strait the gate, \r\n How charged with punishments the scroll. \r\n I am the master of my fate: \r\n I am the captain of my soul.",
		tags: ["William Ernest Henley"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "Warning",
		body: "When I am an old woman I shall wear purple With a red hat which doesn’t go, and doesn’t suit me. \r\n And I shall spend my pension on brandy and summer gloves \r\n And satin sandals, and say we’ve no money for butter. \r\n I shall sit down on the pavement when I’m tired \r\n And gobble up samples in shops and press alarm bells \r\n And run my stick along the public railings \r\n And make up for the sobriety of my youth. \r\n I shall go out in my slippers in the rain \r\n And pick flowers in other people’s gardens \r\n And learn to spit. \r\n You can wear terrible shirts and grow more fat \r\n And eat three pounds of sausages at a go \r\n Or only bread and pickle for a week \r\n And hoard pens and pencils and beermats and things in boxes. \r\n But now we must have clothes that keep us dry \r\n And pay our rent and not swear in the street \r\n And set a good example for the children. \r\n We must have friends to dinner and read the papers. \r\n But maybe I ought to practice a little now? \r\n So people who know me are not too shocked and surprised \r\n When suddenly I am old, and start to wear purple.",
		tags: ["Jenny Joseph"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "On The Ning Nang Nong",
		body: "On the Ning Nang Nong Where the Cows go Bong! \r\n and the monkeys all say BOO! \r\n There’s a Nong Nang Ning \r\n Where the trees go Ping! \r\n And the tea pots jibber jabber joo. \r\n On the Nong Ning Nang \r\n All the mice go Clang \r\n And you just can’t catch ’em when they do! \r\n So its Ning Nang Nong \r\n Cows go Bong! \r\n Nong Nang Ning \r\n Trees go ping \r\n Nong Ning Nang \r\n The mice go Clang \r\n What a noisy place to belong \r\n is the Ning Nang Ning Nang Nong!!",
		tags: ["Spike Milligan"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "Do Not Go Gentle Into That Good Night",
		body: "Do not go gentle into that good night, Old age should burn and rave at close of day; \r\n Rage, rage against the dying of the light. \r\n Though wise men at their end know dark is right, \r\n Because their words had forked no lightning they \r\n Do not go gentle into that good night. \r\n Good men, the last wave by, crying how bright \r\n Their frail deeds might have danced in a green bay, \r\n Rage, rage against the dying of the light. \r\n Wild men who caught and sang the sun in flight, \r\n And learn, too late, they grieved it on its way, \r\n Do not go gentle into that good night. \r\n Grave men, near death, who see with blinding sight \r\n Blind eyes could blaze like meteors and be gay, \r\n Rage, rage against the dying of the light. \r\n And you, my father, there on that sad height, \r\n Curse, bless, me now with your fierce tears, I pray. \r\n Do not go gentle into that good night. \r\n Rage, rage against the dying of the light.",
		tags: ["Dylan Thomas"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "Hope Is The Thing With Feathers",
		body: "‘Hope’ is the thing with feathers — That perches in the soul — \r\n And sings the tune without the words — \r\n And never stops — at all — \r\n And sweetest — in the Gale — is heard — \r\n And sore must be the storm — \r\n That could abash the little Bird \r\n That kept so many warm — \r\n I’ve heard it in the chillest land — \r\n And on the strangest Sea — \r\n Yet, never, in Extremity, \r\n It asked a crumb — of Me.",
		tags: ["Emily Dickinson"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "A Poison Tree",
		body: "I was angry with my friend: I told my wrath, my wrath did end. \r\n I was angry with my foe: \r\n I told it not, my wrath did grow. \r\n And I watered it in fears, \r\n Night and morning with my tears; \r\n And I sunned it with smiles, \r\n And with soft deceitful wiles. \r\n And it grew both day and night, \r\n Till it bore an apple bright. \r\n And my foe beheld it shine. \r\n And he knew that it was mine, \r\n And into my garden stole \r\n When the night had veiled the pole; \r\n In the morning glad I see \r\n My foe outstretched beneath the tree.",
		tags: ["William Shakespeare"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "I Wandered Lonely As A Cloud",
		body: "I wandered lonely as a cloud That floats on high o’er vales and hills, \r\n When all at once I saw a crowd, \r\n A host, of golden daffodils; \r\n Beside the lake, beneath the trees, \r\n Fluttering and dancing in the breeze. \r\n Continuous as the stars that shine \r\n And twinkle on the milky way, \r\n They stretched in never-ending line \r\n Along the margin of a bay: \r\n Ten thousand saw I at a glance, \r\n Tossing their heads in sprightly dance. \r\n The waves beside them danced; but they \r\n Out-did the sparkling waves in glee: \r\n A poet could not but be gay, \r\n In such a jocund company: \r\n I gazed- and gazed- but little thought \r\n What wealth the show to me had brought: \r\n For oft, when on my couch I lie \r\n In vacant or in pensive mood, \r\n They flash upon that inward eye \r\n Which is the bliss of solitude; \r\n And then my heart with pleasure fills, \r\n And dances with the daffodils.",
		tags: ["William Wordsworth"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "Mother To Son",
		body: "Well, son, I’ll tell you: Life for me ain’t been no crystal stair. \r\n It’s had tacks in it, \r\n And splinters, \r\n And boards torn up, \r\n And places with no carpet on the floor — \r\n Bare. \r\n But all the time \r\n I’se been a-climbin’ on, \r\n And reachin’ landin’s, \r\n And turnin’ corners, \r\n And sometimes goin’ in the dark \r\n Where there ain’t been no light. \r\n So, boy, don’t you turn back. \r\n Don’t you set down on the steps. \r\n ’Cause you finds it’s kinder hard. \r\n Don’t you fall now — \r\n For I’se still goin’, honey, \r\n I’se still climbin’, \r\n And life for me ain’t been no crystal stair.",
		tags: ["Langston Hughes"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "I Choose The Mountain",
		body: "The low lands call I am tempted to answer \r\n They are offering me a free dwelling \r\n Without having to conquer \r\n The massive mountain makes its move \r\n Beckoning me to ascend \r\n A much more difficult path \r\n To get up the slippery bend \r\n I cannot choose both \r\n I have a choice to make \r\n I must be wise \r\n This will determine my fate \r\n I choose, I choose the mountain \r\n With all its stress and strain \r\n Because only by climbing \r\n Can I rise above the plain \r\n I choose the mountain \r\n And I will never stop climbing \r\n I choose the mountain \r\n And I shall forever be ascending \r\n I choose the mountain.",
		tags: ["Howard Simon"],
	},
	{
		author: "61ef10acb6e3e8ae037987dc",
		title: "A Smile To Remember",
		body: "We had goldfish and they circled around and around in the bowl on the table near the heavy drapes \r\n covering the picture window and \r\n my mother, always smiling, wanting us all \r\n to be happy, told me, ‘be happy Henry!’ \r\n and she was right: it’s better to be happy if you \r\n can \r\n but my father continued to beat her and me several times a week while \r\n raging inside his 6-foot-two frame because he couldn’t \r\n understand what was attacking him from within. \r\n my mother, poor fish, \r\n wanting to be happy, beaten two or three times a \r\n week, telling me to be happy: ‘Henry, smile! \r\n why don’t you ever smile?’ \r\n and then she would smile, to show me how, and it was the \r\n saddest smile I ever saw \r\n one day the goldfish died, all five of them, \r\n they floated on the water, on their sides, their \r\n eyes still open, \r\n and when my father got home he threw them to the cat \r\n there on the kitchen floor and we watched as my mother \r\n smiled.",
		tags: ["Howard Simon"],
	},
];

const seed = async () => {
	try {
		await mongoose
			.connect(mongoURI, {
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then(async () => {
				poemSeedArray.forEach(async (poem) => {
					let newPost = new Submission({ ...poem });
					let savedPost = await newPost.save();
					console.log("savedPost: ", savedPost);
				});
			});
	} catch (error) {
		console.log("error: ", error);
	}
};

console.log("Submission: ", Submission);

seed();
