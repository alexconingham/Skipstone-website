-- ============================================================
-- 1. CREATE TABLE (skip if you already ran this)
-- ============================================================

CREATE TABLE IF NOT EXISTS public.posts (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title       text NOT NULL,
  slug        text NOT NULL UNIQUE,
  excerpt     text,
  content     text NOT NULL,
  cover_image text,
  published_at timestamptz NOT NULL,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_posts_published_at ON public.posts (published_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_slug         ON public.posts (slug);

-- Row Level Security: anyone can read published posts
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read published posts" ON public.posts;
CREATE POLICY "Public can read published posts"
  ON public.posts FOR SELECT
  USING (published_at <= now());


-- ============================================================
-- 2. INSERT THE 5 BLOG POSTS (time-gated via published_at)
-- ============================================================

INSERT INTO public.posts (title, slug, excerpt, content, published_at) VALUES

-- ── Post 1 ─────────────────────────────────────────────────
(
  'The 35-Year Gap',
  'the-35-year-gap',
  'My mum rented Kid Chameleon on the Sega Mega Drive when I was a kid. That feeling never went away. It just got more expensive to ignore.',
  E'My mum rented Kid Chameleon on the Sega Mega Drive when I was a kid. I don''t remember how old I was exactly, but I remember the feeling: the desperate wish that I could reach inside the cartridge and make my own levels, my own abilities, my own version of the game.\n\nThat feeling never went away. It just got more expensive to ignore.\n\nFor thirty-five years it sat in the background, patient and persistent. I played everything I could find. I finished games, abandoned games, fell in love with games. I spent the last several years hunting for something specific: a game dark enough to mean something, mechanically deep enough to keep pulling me back, narratively rich enough to feel like it was actually about something.\n\nI found things that came close. Binding of Isaac got under my skin in a way few games do. Balatro reminded me that elegance and depth aren''t opposites. But nothing quite landed where I wanted it to.\n\nSo I decided to make it myself. Reasonable response.\n\nI want to be clear about what that decision meant at the time: I am not a developer. I am not an artist. I am not a composer. I had no team, no budget, no publisher, and no realistic path to acquiring any of those things. What I had was thirty-five years of knowing exactly what kind of game I wanted to play, an obsessive streak, and a suspicion that the tools had finally caught up to the dream.\n\nThat suspicion turned out to be correct. Mostly.\n\nRemember to Die is a tactical dice roguelike about memory, mortality, and occasionally doing obscene damage numbers. It''s the game I spent thirty-five years looking for. It''s finished. It''s real. And it''s coming to Steam.\n\nIf that sounds like your kind of thing, wishlist it on Steam.\n\nMore soon.',
  '2026-04-05T09:00:00+00:00'
),

-- ── Post 2 ─────────────────────────────────────────────────
(
  'The Apprenticeship Nobody Saw',
  'the-apprenticeship-nobody-saw',
  'Before Remember to Die, I made four other games. Nobody played them. That was more or less the point.',
  E'Before Remember to Die, I made four other games. Nobody played them. That was more or less the point.\n\nI should back up.\n\nWhen I decided I was going to make a game, I was smart enough to know I wasn''t ready to make *the* game. So I made smaller ones first. Each one was a deliberate attempt to get better at something: tighter mechanics, more complex systems, longer play sessions, more moving parts. A training montage, except slower and with more swearing at my screen at midnight.\n\nThe first was **Geneheart**: a Tamagotchi-style creature raising RPG with auto-battles and a gene splicing system, all under 300kb. The inspiration was those impossibly tiny original Game Boy cartridges and everything they managed to fit inside them. It has exploration, battles, and more depth than something that small has any right to contain.\n\nThen came a remake of **Scorched Earth**, because I missed that game and nobody had done it justice, and sometimes that''s reason enough.\n\nThen **Fa(r)ther**: an RTS survival game set in the Aliens universe, built to look and feel like the computers from the films. MUTHUR would be proud. Probably. It has hidden lore, layered mechanics, and a surprise alternate ending that approximately nobody has found yet.\n\nThen **Fox Three**: a text and image based MMO air combat game with base building, PvPvE dogfights, medals, and more mechanical layers than I had any business attempting.\n\nAll of them are free to play on the website. Go have a look if you''re curious about the journey.\n\nEach one taught me something I needed to know before I could make RTD properly. Geneheart taught me systems. Fa(r)ther taught me scope and narrative. Fox Three taught me that multiplayer is a special kind of punishment and I respect anyone who ships it.\n\nAnd somewhere in the middle of all of that, Remember to Die was quietly taking shape. Not as a side project. As the destination.\n\nThe other games weren''t distractions. They were the road.\n\nMore soon.',
  '2026-04-26T09:00:00+00:00'
),

-- ── Post 3 ─────────────────────────────────────────────────
(
  'What AI Actually Did (And Didn''t Do)',
  'what-ai-actually-did',
  'I''ve been putting this post off. Not because I''m ashamed of the answer, but because the conversation around AI in games is loud and not always sensible.',
  E'I''ve been putting this post off. Not because I''m ashamed of the answer, but because the conversation around AI in games is loud and not always sensible, and I wanted to say this carefully.\n\nRemember to Die was built with AI. Substantially. Here''s exactly what that means.\n\nI used Cursor as the backbone of development, with whatever the best available coding model was at any given time. Over eighteen months that changed constantly: GPT-3.5 early on, then Gemini, then Claude, then back again as each new model leapfrogged the last. The engine is Godot. My job was to know what I wanted and describe it precisely enough that the AI could help me build it. Early on that required genuinely good prompting. Later the models got good enough that I just had to be clear.\n\nFor assets, I used ChatGPT and Gemini to generate base images, then spent somewhere north of 400 hours in Aseprite manually refining every single one. Every asset in the game has my hands on it. AI got me to about halfway. The rest was me, pixel by pixel, at midnight, when I should have been asleep.\n\nMusic is AI generated via Suno. Audio assets are open source and credited in the game.\n\nFor balance, I built Monte Carlo simulators that ran millions of combinations of dice and mementos to find bugs, identify broken interactions, and make sure the game was fair without being predictable. I wanted clever players to find powerful combinations. I also didn''t want those combinations to be so obvious they became the only way to play.\n\nHere is what AI did not do.\n\nIt did not write the narrative. Every memory fragment, every piece of lore on every memento, every variation in the story depending on which fragments you chose: that''s mine. The memory mechanic came from my own life, from thinking about the memories I''ve kept, the ones I''ve quietly reshaped, and what the consequences of that actually are. No model was going to write that for me, and I wouldn''t have wanted one to.\n\nIt did not make the creative decisions. Every die, every memento, every system, every design choice about what felt right and what didn''t: those are human calls. AI is very good at execution. It is not good at knowing what''s worth executing.\n\nAnd here''s the thing I want to say plainly: without AI this game does not exist. I couldn''t have afforded to hire a development team. I couldn''t have written the code myself. No one lost a job to this game because there was never a version of this game where anyone had a job. AI didn''t replace human creativity here. It replaced an absence.\n\nI''m a 40-something with a career, a family, and a 35-year-old dream. AI opened the door. Everything that matters walked through it on its own.\n\nMore soon.',
  '2026-05-17T09:00:00+00:00'
),

-- ── Post 4 ─────────────────────────────────────────────────
(
  'The Game I Almost Didn''t Show Anyone',
  'the-game-i-almost-didnt-show-anyone',
  'For eighteen months, Remember to Die existed in a room that only I could see. No dev log. No community. No social media thread documenting the journey.',
  E'For eighteen months, Remember to Die existed in a room that only I could see.\n\nNo dev log. No community. No social media thread documenting the journey. Just me, a laptop, and whatever hours I could steal after the family went to bed. Most nights that meant 11pm to 3am. A few strategic sick days. The kind of schedule that sounds romantic in retrospect and feels like slow deterioration at the time.\n\nNobody knew I was making it. That was partly practical: I didn''t have anything to show for a long time, and I wasn''t sure I ever would. But it was also something else. This game is personal in ways I''m still working out how to talk about. The memory mechanic didn''t come from nowhere. I''ve spent time thinking about the memories I''ve held onto, the ones I''ve quietly rewritten, the ones I''ve let go of entirely and replaced with something more comfortable. None of that is dramatic. It''s just human. But it meant the game felt like mine in a way that made showing it to anyone feel exposing.\n\nSo I didn''t. I just kept building.\n\nWhat nearly stopped me wasn''t the technical problems, although there were plenty. It wasn''t learning Godot from scratch, or teaching myself Aseprite, or figuring out the Steam SDK, or navigating Steam partner verification, or suddenly realising I needed to think about business registration and tax implications and platform compliance and about fifteen other things nobody mentions when they tell you to follow your dream. It wasn''t any of that.\n\nIt was a quieter fear: that I''d finish it, and nobody would find it, and it would just sit there. Not because it wasn''t good enough, but because I''d spent all my energy making it and had nothing left to figure out how to be heard. The games industry is full of genuinely good games that disappeared without a trace purely because the person who made them didn''t know how to market, or didn''t have the audience, or just got lost in the noise. That kept me up more than the code did.\n\nI still don''t know if anyone will find it. That''s just the truth.\n\nWhat I do know is that my ambition for this game was never financial. If Remember to Die sells enough copies to cover the $100 Steam submission fee, that''s the commercial goal met. Every hour beyond that, every late night, every version of a sprite I redrew six times: that was already paid for by the fact that I got to make it. I have a game. My game. One I can play whenever I want. That took thirty-five years and I''m not sure anything could have made it feel more worth it.\n\nIf something does come of it, those proceeds go toward the next one: a proper side scrolling descent through the circles of Hell, the kind of game that would need real artists and real animation and a budget that RTD might, if I''m lucky, help create. AI got me here. RTD gets me there. That''s the plan, anyway.\n\nFor now: the game is done, the page is live, and I''ve run out of reasons not to show it to people.\n\nWishlist it on Steam if you want to see where this goes.\n\nOne more post to go.',
  '2026-06-06T09:00:00+00:00'
),

-- ── Post 5 ─────────────────────────────────────────────────
(
  'It''s Done. Here''s What I Learned.',
  'its-done-heres-what-i-learned',
  'Remember to Die is out today. I''m not going to oversell it. What I want to do is say a few honest things about what I learned.',
  E'Remember to Die is out today.\n\nI''m not going to oversell it. It''s a tactical dice roguelike about memory and mortality with 32 dice, 112 mementos, over a billion possible story combinations, and four secret endings beyond the standard finale. It was made by one person over eighteen months, mostly between 11pm and 3am, using AI as a creative instrument and stubbornness as a production methodology. It costs $6.99 USD. It runs on Steam Deck.\n\nThat''s the pitch. If you''ve read the previous posts you already know the rest.\n\nWhat I want to do with this one is say a few honest things about what I learned, in case any of it is useful to someone sitting where I was sitting eighteen months ago.\n\n**The tools are genuinely there.** If you have a game in your head and you''ve been waiting for the right moment or the right skills or the right budget, I''d gently suggest that moment is probably now. AI won''t make the creative decisions for you and it won''t care about your game the way you do. But it will do a remarkable amount of the work that previously required either money or years of technical training. The gap between having an idea and being able to build it has never been smaller.\n\n**Know what you''re good at and stay in your lane.** I''m a designer and a writer and someone who has thought about games for thirty-five years. I am not a programmer or an artist or a composer. The project worked because I was honest about that from the start and found tools to fill the gaps rather than pretending the gaps weren''t there.\n\n**The unglamorous stuff will take longer than the fun stuff.** Learning Godot, learning Aseprite, navigating Steam partner verification, sorting out the legal and business side of actually releasing something, figuring out marketing when you''ve never marketed anything: all of it took time I hadn''t budgeted for and none of it was as interesting as making the game. Do it anyway.\n\n**Ship the thing.** This is the only one I''d underline. The fear of nobody finding it is real and legitimate and will not go away before launch. Ship it anyway. The alternative is a finished game that nobody plays because you never showed it to anyone, which is considerably worse than a finished game that not many people play because the market is crowded. At least one of those outcomes involves your game existing in the world.\n\nAnd if you''re a kid, or you feel like one, and someone told you that you needed to learn to code before you could make something real: the tools are waiting for you. Dream big, push through the moments where nothing works and everything is broken, work out what AI is good at and what you''re good at, and stay in your lanes. Trust your instincts. Sometimes the strangest concepts come together in the most unexpected ways.\n\nThat last bit I mean genuinely. This game started as a thought about memory and ended up being about dice and mortality and the lives we choose to remember. I didn''t see that coming. It came together anyway.\n\nGo play it. And if you like it, tell someone.\n\nRemember to Die is available now on Steam. All previous games — Geneheart, Fa(r)ther, Fox Three, and Scorched Earth — are free to play on the website. If RTD finds an audience, the next game is already waiting.',
  '2026-06-26T09:00:00+00:00'
);
