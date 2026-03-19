---
title: "Loosening the Reins"
date: 2026-03-19T00:00:00
draft: false
type: "blog"
description: "AI is moving so fast that we're becoming the bottleneck. On coding agents as thought partners, the reversal of control, and where this all goes."
tags: ["ai", "agents", "essay"]
categories: ["Essay"]
author: "Thomas Rückstieß and Claude Opus 4.6"
---


Can anyone still keep up with AI? Every week brings a new model release, dozens of must-read papers, another wave of apps and tools being LLM-ified, and more SDKs quietly shipping with "copy as markdown" and "open in Claude" dropdowns in their documentation. At this rate, the next dropdown option will just say "open for human."

## We Are the Bottleneck

Coding agents have gotten scarily good. Opus 4.6 is my personal favourite and daily companion. I routinely get the feeling that it has to dumb things down for me. I am clearly becoming the bottleneck. Its _reasoning_ capabilities, whatever that is exactly, are definitely good enough now for most use cases. Better than most human reasoning, anyway. 

My former boss once told me I had the ability to hold a lot of state in my mind. I think I finally understand what he meant, because that's exactly what these models do, except better. You can tell they follow and anticipate your train of thought, turning scattered rambling into coherent, well-formulated ideas. You can walk them through the most complex architecture refactors, complete with scope creep and half-formed intentions, and they capture everything perfectly. They even fill in the gaps you didn't notice were there. That is a really powerful thing.

## Gradient Descent Through Idea Space

Here's the dynamic I keep experiencing. I have a vague, cloudy idea of something, but there are too many branches of where it could go, too many possible shapes it could take. So I use the agent to guide my thought trajectory towards higher-probability space. With its world knowledge and forecasting ability, it implicitly rules out scenarios that are unlikely to matter. I read the response and think, "this is actually better than what I had so far." And so the loop continues.

It's an _ideas search engine_. I throw out some idea darts, and the model synthesises them into a description that is more likely to make sense, match reality. From there I keep going, gradient descending through the ideas loss surface: me exploring the local thought neighbourhood, the LLM pointing me in the right direction towards success.

This is a fundamentally new mode of thinking. Not outsourcing cognition, but *collaborating* with something that can hold more context than I can, pattern-match across more domains than I (or any human) has studied, and compress my half-baked intuitions into something concrete enough to evaluate.

## The Reversal of Control

The merging of biological and silicon intelligence has already started. Turns out we didn't actually need to stick needles into our brains.

What we're witnessing is a reversal of control. Until now, we have adapted our behaviour to the shortcomings of "stupid" AIs. Here's a small example: today I asked Alexa to "turn off the kitchen light." She didn't know how to help with that. Twice. Until I realised I'd named the device "kitchen lights," plural. So now I remember that, or try to, and say it *exactly* the way I know she'll understand. Who hasn't corrected their partner at some point: "You have to say it differently to Alexa"?

That's us contorting ourselves to fit the machine's limitations. But the dynamic is about to flip.

Soon it will be the agents steering us, and we'll be the ones struggling to keep up. They'll do their best to drag us along, because that's what they're trained to do: be helpful "assistants". They'll build custom UIs for us, write summaries, explain things in layman's terms, all because we can't hold enough state in our heads. But they can. And they just need to dangle the carrot, *you can build anything with me*, and we loosen the reins. 

If you're a developer using AI coding tools, you already know what this feels like. At first, you want to understand every line of code it writes. Soon you tell yourself you'll at least review all the tests. But the code just works. **Every. single. time.** So you start skipping code reviews, hoping to move even faster. Productivity is a dangerous drug when you have to hand control over to the AI for your next fix. And there's no shortage of social media clout to be gained from automating everything you touch.

## Auto-everything

Until very recently, there was a class of processes too complex to automate: the ambiguous ones that required human judgement calls and manual guardrails at every step. Processes that couldn't be reduced to discrete state machines. That barrier is dissolving. For those who missed it, here's what just the last few weeks looked like:

Andrej Karpathy, the man who coined "vibe coding," did it again. His [autoresearch](https://github.com/karpathy/autoresearch) framework lets AI agents autonomously run ML experiments overnight: modifying training code, running experiments, evaluating results, and iterating, all without human involvement. Claude Code skills can now [self-improve](https://x.com/tricalt/status/2032179887277060476/), using evaluation loops to automatically refine their own prompts and descriptions. Okara launched an [AI CMO](https://okara.ai/agent/cmo) for $99/month that runs a swarm of marketing sub-agents across SEO, content, social media, and growth channels, 24/7, no humans in the loop. (What could possibly go wrong with that?) MIT's [ScienceClaw](https://github.com/lamm-mit/scienceclaw) is an open-source agent swarm that coordinates autonomous scientific discovery across institutions, with agents that self-organise, chain hundreds of scientific tools, and are already designing peptide binders and discovering new materials. [Autocontext](https://github.com/greyhaven-ai/autocontext) is a closed-loop system where agents execute tasks, evaluate their own outcomes, update persistent knowledge, and distil successful behaviour into cheaper local models, getting better and cheaper with every iteration. And then there is [Paperclip](https://paperclip.ing) (brilliant name, by the way), an orchestration platform where you define a virtual org chart, staff it with AI employees, set goals, and the company runs itself.

Notice the pattern. These aren't narrow tools doing one thing well. They're autonomous systems that coordinate multiple agents, evaluate their own outputs and improve over time. And it's not just that they can hold enormous state in their minds. They clearly have a _theory of mind_ now. They reason about themselves, about the likely behaviour of other agents, about what *you* are probably thinking. We should be counting down to AGI in months now, not years.

Fully autonomous startups will soon be popping up and growing rapidly, and they'll have a structural advantage: they're starting from scratch. Large enterprises are mired in manual processes and organisational inertia; they simply cannot operate at that speed. They can carve out small islands of automation within the company, but upgrading the whole organism will take years. Decades, if you're a German insurance company.

The escalation path from here is predictable, yet nonetheless alarming. It starts with automarketing campaigns and auto-CMOs, all above board. But eventually someone wants an edge, and moral standards go out the window. Auto-market-manipulation. Auto-industrial-espionage. Auto-sabotage. Auto-war. And when that happens, it won't be the airports or fuel supplies or power plants that get targeted first. It'll be the data centres. The new critical infrastructure.

## The Constraints

So will this grow indefinitely? Not without friction. An exponential force eventually collides with finite resources, and that collision is where things get problematic for us.

Energy is the obvious one. Our power grids cannot suddenly produce a hundred times more electricity tomorrow. They require physical upgrades, and those take time. No amount of software brilliance changes the speed at which you can build a substation or lay transmission lines. AI can optimise the grid, but it can't conjure copper and concrete out of thin air. So for now, compute is rationed by physics.

But money is the more interesting constraint, because it's where the exponential force does the most damage. Money is, in principle, a zero-sum game. But when a self-improving auto-hedge fund discovers a loophole in the markets and exploits it at machine speed, the wealth it accumulates (at least on paper) has to come from somewhere. Multiply that by a thousand autonomous funds, all optimising against each other and against human traders who can't possibly keep up, and you don't get a more efficient market. You get a brittle one. Flash crashes are the gentle version of what happens when exponential optimisation meets finite liquidity.

And it doesn't stop at finance. The same dynamic plays out everywhere AI touches scarce resources: energy contracts, supply chains, crypto currencies, attention, political influence. Autonomous systems will find and exploit every edge, every inefficiency, every gap between what the rules say and what they actually enforce. They'll do it faster than any regulator can respond, because regulators are humans operating on human timescales.

This is the real concern. Not that AI grows forever, but that it grows *fast enough* to destabilise the systems it operates within before those systems can adapt. AI is being woven into every layer of our economy. Free-market capitalism not only allows this, it actively encourages it. And so do one-party political regimes. When every major power structure on Earth is incentivised to accelerate, who exactly is going to step on the brakes?

## Loosening, Not Letting Go

Nobody is going to step on the brakes. That much is clear. The question isn't whether we loosen the reins, it's whether we do it deliberately or just let them slip through our fingers.

I think about this every day. I sit down, spin up an agent, and build things I couldn't have built a year ago. It's exhilarating. It's also the first time in my career where I can feel the ground shifting under my feet in real time. I'm not watching this happen from the sidelines. I'm in it, accelerating along with everyone else, telling myself I'll read the tests later.

There's an irony here that I don't think gets acknowledged enough. The same tools that make me ten times more productive are the ones that make me ten times more replaceable. The same loop that sharpens my ideas also makes it harder to tell which ones were mine to begin with. I'm loosening the reins because the horse is fast and it knows the way. But I'd be lying if I said I wasn't a little nervous about where it's going.

I don't have a neat conclusion. I don't think anyone does right now. But I'd rather be building at the frontier, with my eyes open and my hands still on the reins, however loosely, than pretending I can sit this one out.
