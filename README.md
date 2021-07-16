<p align="center">
  <a href="https://nodes.ws">
    <img alt="Nodes" src="https://nodes.vercel.app/static/nodes.jpeg" width="75%" height="75%" />
  </a>
</p>

<p align="center">
  <a aria-label="License" href="https://github.com/TimPchelintsev/nodes/LICENSE">
    <img alt="" src="https://img.shields.io/github/license/nodes-ws/nodes?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="join us in spectrum" href="https://spectrum.chat/nodes">
    <img alt="" src="https://img.shields.io/badge/Join%20the%20community-blueviolet.svg?style=for-the-badge&labelColor=000000">
  </a>
  <a aria-label="support us on patreon" href="https://patreon.com/nodes">
    <img alt="" src="https://img.shields.io/badge/Support%20on%20Patreon-red.svg?style=for-the-badge&labelColor=000000">
  </a>
</p>

<h3 align="center">
  The web has evolved. Finally, operating system has too.
</h3>

<p align="center">
  Hackable lightweight offline-first web OS with composable apps.
</p>

## What is Nodes?

<p align="center">
  <a href="https://nodes.ws">
    <img alt="What is Nodes?" src="https://nodes.vercel.app/static/demo.gif" width="75%" height="75%" />
  </a>
</p>


## Motivation & Design

Ancient Vedic Scripture <a href="https://www.vedabase.com/en/iso/">Sri Isopanisad</a> states:

<i>oṁ pūrṇam adaḥ pūrṇam idaṁ  
pūrṇāt pūrṇam udacyate  
pūrṇasya pūrṇam ādāya  
pūrṇam evāvaśiṣyate</i>

>The Personality of Godhead is perfect and complete, and because He is completely perfect, all emanations from Him, such as this phenomenal world, are perfectly equipped as complete wholes. Whatever is produced of the Complete Whole is also complete in itself. Because He is the Complete Whole, even though so many complete units emanate from Him, He remains the complete balance.
-- <cite>His Divine Grace A.C. Bhaktivedanta Swami Prabhupāda, Founder-Ācārya of the ISKCON</cite>


While studying Vedas I was amazed by this fractal-like description of God, so this verse is a cornerstone of Nodes design principles.

1. Node is like filesystem directory with superpowers given by micro-apps called "sides".
2. Each side "do one thing and do it well", like url preview, text note and so on.
3. Each node can contain only one instance of each side type, and another nodes.

This enables fractal design of arbitrary problem solving. Given that sides can be developed independently by OSS community and then easily and instantly "installed" from url and that every node(with all child nodes) can be used as template to create new nodes we get simple, scalable and robust alternative to current "bunch of closed source independent apps" situation.
