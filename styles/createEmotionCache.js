import createCache from "@emotion/cache";

// prepend: true moves MUI styles to the top of the <head> so they're loaded first.
// Leave true to allow for easy overwriting
export default function createEmotionCache() {
	return createCache({ key: "css", prepend: true });
}
