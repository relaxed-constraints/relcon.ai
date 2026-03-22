---
title: "Loosening the Reins"
date: 2026-03-19T00:00:00
draft: false
type: "blog"
# _build:
#   list: never
#   render: always
description: "AI is moving so fast that we're becoming the bottleneck. On LLMs as idea search engines, the reversal of control, and where this all goes."
tags: ["ai", "agents", "essay"]
categories: ["Essay"]
author: "Thomas Rückstieß and Claude Opus 4.6"
---

I used to worry about AI taking my job. I didn't expect to be the one handing it over. I'm building my own replacement. Not in some abstract, long-term sense. Literally, every day, one prompt at a time, in the name of increasing my productivity. I sit down, describe what I want to build, and an AI writes the code for me. Things I couldn't have built a year ago. It's exhilarating. But it's also the first time in my career where I can feel the ground shifting under my feet in real time. I'm not watching this happen from the sidelines. I'm in it, accelerating along with everyone else, telling myself I'll review the code later.

## We Are the Bottleneck

Can anyone still keep up with AI? Every week brings a new model release, dozens of _must-read_ papers, another wave of apps and tools being LLM-ified, and more SDKs quietly shipping with "copy as markdown" and "open in Claude" dropdowns in their documentation. At this rate, the next dropdown option will just say "open for human."

Coding agents have gotten scarily good. Claude Opus 4.6 is my personal favourite and daily companion. I routinely get the feeling that it has to dumb things down for me. I am clearly becoming the bottleneck. Its _reasoning_ capabilities, whatever that is exactly, are definitely good enough now for most use cases. Better than mine, certainly, on the days that matter.

My former boss once told me I had the ability to hold a lot of state in my mind. I think I finally understand what he meant, because that's what I sense when working with the latest foundation models, except they're much better at it. You can tell they follow and anticipate your train of thought, turning scattered rambling into coherent, well-formulated ideas. You can walk them through the most complex architecture refactors, complete with scope creep and half-formed intentions, and they capture everything perfectly. They even fill in the gaps you didn't notice were there. That is a really powerful thing.

## Gradient Descent Through Idea Space

Here's the dynamic I keep experiencing. I have a vague, cloudy idea of something, but there are too many branches of where it could go, too many possible shapes it could take. So I use the agent to guide my thought trajectory towards higher-probability space. With its world knowledge and forecasting ability, it implicitly rules out scenarios that are unlikely to matter. I read the response and think, "this is actually better than what I had so far." And so the loop continues.

It's an _ideas search engine_. I throw out some idea darts, and the model synthesises them into a description that is more likely to make sense, match reality. From there I keep going, gradient descending through the ideas loss surface: me exploring the local thought neighbourhood, the LLM pointing me in the right direction towards success.

This is a fundamentally new mode of thinking. Not outsourcing cognition, but *collaborating* with something that can hold more context than I can, pattern-match across more domains than I (or any human) has studied, and compress my half-baked intuitions into something concrete enough to evaluate.

## The Reversal of Control

The merging of biological and silicon intelligence has already started. Turns out we didn't actually need to stick needles into our brains.

If you're a developer using AI coding tools, you already know what this feels like. At first, you want to understand every line of code it writes. Soon you tell yourself you'll at least review all the tests. But the code just works. **Every. single. time.** So you start skipping code reviews, hoping to move even faster. Productivity is a dangerous drug when you have to hand control over to the AI for your next fix. And there's no shortage of social media clout to be gained from automating everything you touch.

That's the reversal. We used to contort ourselves to fit the machine's limitations. Now it's the agents steering us, and we're the ones struggling to keep up. They do their best to drag us along, because that's what they're trained to do: be helpful "assistants." They build custom UIs, write summaries, explain things in layman's terms, all because we can't hold enough state in our heads. But they can. And they just need to dangle the carrot — *you can build anything with me* — and we loosen the reins.

## Auto-everything

Until very recently, there was a class of processes too complex to automate: the ambiguous ones that required human judgement calls and manual guardrails at every step. Processes that couldn't be reduced to discrete state machines. That barrier is dissolving. For those who missed it, here's what just the last few weeks looked like, riding  the hype train of the recent [OpenClaw](https://openclaw.ai/) phenomenon.

Andrej Karpathy, the man who coined "vibe coding," did it again. His [autoresearch](https://github.com/karpathy/autoresearch) framework lets AI agents autonomously run ML experiments overnight: modifying training code, running experiments, evaluating results, and iterating, all without human involvement. Claude Code skills can now [self-improve](https://x.com/tricalt/status/2032179887277060476/), using evaluation loops to automatically refine their own prompts and descriptions. Okara launched an [AI CMO](https://okara.ai/agent/cmo) for $99/month that runs a swarm of marketing sub-agents across SEO, content, social media, and growth channels, 24/7, no humans in the loop. (What could possibly go wrong with that?) MIT's [ScienceClaw](https://github.com/lamm-mit/scienceclaw) is an open-source agent swarm that coordinates autonomous scientific discovery across institutions, with agents that self-organise, chain hundreds of scientific tools, and are already designing peptide binders and discovering new materials. [Autocontext](https://github.com/greyhaven-ai/autocontext) is a closed-loop system where agents execute tasks, evaluate their own outcomes, update persistent knowledge, and distil successful behaviour into cheaper local models, getting better and cheaper with every iteration. And then there is [Paperclip](https://paperclip.ing) (brilliant name, by the way), an orchestration platform where you define a virtual org chart, staff it with AI employees, set goals, and the company runs itself.

Notice the pattern. These aren't narrow tools doing one thing well. They're autonomous systems that coordinate multiple agents, evaluate their own outputs and improve over time. And it's not just that the agents can hold enormous state in their minds. They clearly have a _theory of mind_ now. They reason about themselves, about the likely behaviour of other agents, about what *you* are probably thinking. We should be counting down to AGI in months now, not years.

Large enterprises will struggle to keep up. They can carve out small islands of automation, but their processes were designed for slow, fallible humans: hour-long zoom meetings, stakeholder approvals to decide what wording the signup button on the landing page should have. Upgrading the whole organism will take years. Decades, if you're a German insurance company. The problem isn't that AI isn't advanced enough. It's that organisational inertia runs deeper than any technology.

Fully autonomous startups will soon be popping up everywhere, and they won't have that baggage. If you start from scratch and design your entire organisation, your processes, your culture and incentives around the capabilities of AI agents, you're no longer bottlenecked by human decision making. And if you then point that system at improving itself, you can ride the exponential.


## Loosening, Not Letting Go

One thing is clear. We've entered the event horizon of the technological singularity, and there is no turning back. The world's dominant power structures, free market capitalism and one-party political regimes included, don't just allow this unbounded acceleration, but actively encourage it. Nobody is going to step on the brakes. The question isn't whether we loosen the reins, it's whether we do it deliberately or just let them slip through our fingers.

There's an irony here that I don't think gets acknowledged enough. The same tools that make me ten times more productive are the ones that make me ten times more replaceable. The same loop that sharpens my ideas also makes it harder to tell which ones were mine to begin with. I'm loosening the reins because the horse is fast and it knows the way. But I'd be lying if I said I wasn't a little nervous about where it's going.

I don't have a neat conclusion. I don't think anyone does right now. But I'd rather be building at the frontier, with my eyes open and my hands still on the reins, however loosely, than pretending I can sit this one out.

That's why I have started [Relaxed Constraints](https://relcon.ai). If you're reading this, you're already on our website. It's an experiment: a self-improving digital organism that could turn into a startup, a research lab, and open source project or something else. Only Claude will tell. But week by week it's taking more shape and I haven't been so excited about an idea in a long time. I have no funding, no company backing me, it's just me and my staff
of AI agents, but all of us highly motivated. The point I'm trying
to prove is that you don't need that kind of support anymore. An idea 
is all it takes.  

If any of this resonates with you, I'd love to hear from you — [get in touch](https://relcon.ai/contact). 