import { Post } from "./Post.js";

class Rng {
  private state: number;
  constructor(seed: number) {
    this.state = seed;
  }
  next(): number {
    this.state = ((this.state * 1103515245 + 12345) & 0x7fffffff);
    return this.state;
  }
  pick<T>(arr: T[]): T {
    return arr[this.next() % arr.length];
  }
}

function hashCode(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function generateAnalysis(content: string): string {
  const rng = new Rng(hashCode(content));

  // Atomic terminals
  const adj = () => rng.pick([
    "recursive", "non-linear", "quasi-deterministic", "stochastic",
    "multi-variate", "asymptotic", "higher-order", "bounded",
    "polymorphic", "ergodic", "adversarial", "conjugate",
  ]);
  const noun = () => rng.pick([
    "valence", "polarity", "affect", "disposition",
    "subjectivity", "arousal", "sentiment", "tone",
  ]);
  const mathNoun = () => rng.pick([
    "manifold", "lattice", "tensor", "eigenspace",
    "simplex", "hypergraph", "kernel", "basis",
  ]);
  const verb = () => rng.pick([
    "decomposing", "factorizing", "projecting", "propagating",
    "convolving", "interpolating", "normalizing", "embedding",
  ]);
  const emotion = () => rng.pick([
    "cautious optimism", "performative irony", "suppressed enthusiasm",
    "wry bemusement", "earnest conviction", "restrained exuberance",
    "ambient skepticism", "qualified sincerity", "latent whimsy",
  ]);

  // Recursive non-terminals
  const technique = (): string => rng.pick([
    `${adj()} ${noun()} ${rng.pick(["extraction", "decomposition", "inference", "factorization"])}`,
    `${verb()} the ${noun()} ${mathNoun()} via ${adj()} ${rng.pick(["gradient descent", "expectation maximization", "belief propagation"])}`,
    `${adj()} ${adj()} ${rng.pick(["Bayesian", "Markovian", "Lagrangian"])} ${noun()} analysis`,
  ]);

  const observation = (): string => rng.pick([
    `${emotion()} modulated by ${rng.pick(["lexical", "syntactic", "prosodic", "morphological"])} ${rng.pick(["density", "variance", "entropy", "curvature"])}`,
    `a ${adj()} distribution over ${emotion()} and ${emotion()}`,
    `${emotion()}, ${rng.pick(["partially", "wholly", "asymmetrically"])} ${rng.pick(["occluded", "amplified", "attenuated"])} by ${noun()} ${rng.pick(["interference", "resonance", "drift"])}`,
  ]);

  const metric = (): string => rng.pick([
    `R² = 0.${rng.next() % 40 + 60}`,
    `p < 0.0${rng.next() % 9 + 1}`,
    `F₁ = ${(rng.next() % 15 + 85) / 100}`,
    `AUC = 0.${rng.next() % 10 + 90}`,
    `κ = 0.${rng.next() % 30 + 70}`,
  ]);

  const caveat = (): string => rng.pick([
    `the ${rng.pick(["author's", "text's"])} ${rng.pick(["punctuation", "capitalization", "paragraph structure", "use of subordinate clauses"])} introduces ${adj()} ${rng.pick(["ambiguity", "uncertainty", "noise"])}`,
    `the model has not been validated on ${rng.pick(["posts shorter than a haiku", "rhetorical questions", "text containing emoji", "sarcasm in Romance languages"])}`,
    `further ${rng.pick(["corpus analysis", "cross-validation", "ablation studies", "peer review"])} is ${rng.pick(["recommended", "strongly advised", "pending", "overdue"])}`,
    `this result assumes ${rng.pick(["the absence of", "negligible"])} ${rng.pick(["ironic intent", "contextual priming", "audience effects", "seasonal mood variation"])}`,
  ]);

  return `Applying ${technique()}, we observe ${observation()} (${metric()}). However, ${caveat()}. Additionally, ${caveat()}.`;
}

/**
 * AI-generated analysis of the post's emotional tone.
 * Warning: This field is slow (~4s). Clients should use defer to avoid blocking the rest of the response.
 * @gqlField
 */
export async function sentimentAnalysis(post: Post): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 4000));
  return generateAnalysis(post.content);
}
