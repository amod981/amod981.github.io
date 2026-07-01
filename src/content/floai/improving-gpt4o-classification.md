---
title: "How I Improved GPT-4o Classification in a RAG System by 42% Without Increasing Risk"
description: "A deep dive into boosting LLM classification accuracy in a healthcare RAG system by 42%—with zero added risk. Learn the multi-stage approach and lessons for robust production AI."
date: "2024-06-01"
readTime: "7 min read"
tags: ["GPT-4o", "RAG", "LLM", "Healthcare", "Prompt Engineering"]
---

# How I Improved GPT-4o Classification in a RAG System by 42% Without Increasing Risk

When working with large language models in production, accuracy isn't just a quality metric — it's the foundation for downstream decisions, especially in healthcare. I recently rewired how our patient response classification works within a RAG-based assistant used by clinics — and boosted accuracy by **42%** for knowledge base queries, all without adding clinical risk.

---

## 🧩 The Problem

Our assistant (Flo) uses LLMs to interpret patient replies, then routes them through a tree-like logic system called **floKB**. This downstream logic assumes that the initial intent classification is reliable. But it wasn't.

Patients often replied with vague, emotional, or indirect responses — things like:

- "Please stop!"
- "I've had a horrible day..."
- "I already told my doctor."

The GPT-4o classification system misinterpreted these, triggering wrong flows, introducing clinical risk, and lowering end-to-end accuracy. A flat classification call was too brittle for the messy edges of human language.

---

## 🛠 My Solution: Drill-Down Classification with Consolidation

Rather than making one flat classification call to OpenAI, I redesigned the pipeline as a multi-stage system:

1. **Level 1: High-Level Categorization**

   A simple first pass determines the broad category:

   - Reading
   - Knowledge base query
   - Acknowledgement
   - General

   This level has fewer labels and clearer boundaries, which improves reliability.

2. **Level 2: Targeted Subclassification**

   Based on the Level 1 result, I trigger a second call only within that subdomain:

   - A knowledge base query might become: assistance, reschedule, or question
   - A reading might be further refined into: measurement, keyword, etc.

   Each Level 2 prompt is tightly scoped, which means:

   - Fewer distractions for the model
   - Less overlap between categories
   - More accurate and scalable behavior without needing tons of examples

3. **Consolidation Logic**

   Finally, I combine the Level 1 and 2 results into a single, production-ready label. This unified output plugs back into our RAG system without any downstream change.

---

## 📊 The Results

After generating new labels using this multi-stage approach, I ran a full analysis comparing:

- 🧠 Old (flat) labels
- ✅ New consolidated labels
- 🎯 Expected/Gold labels

The improvements were clear:

- **42% increase** in correctly identified knowledge base queries
- **12% boost** in reading classification accuracy
- **13% better** acknowledgement detection
- All with **0% increase** in clinical risk

---

## ⚠️ Lessons Learned

- GPT-4o struggles with niche boundaries — even with good instructions. But narrowing scope dramatically improves results.
- More focused prompts = more reliable behavior, even with fewer examples.
- You don't need fine-tuning if you design your calls and consolidation logic carefully.

---

## ✅ Final Thoughts

The power of LLMs comes from their flexibility — but reliability comes from structure. By switching from flat prompting to a layered classification pipeline, I made our assistant more robust, interpretable, and production-ready.

If you're building LLM-powered systems in noisy domains like healthcare, consider:

- ✂️ Less generalization, more focus.
