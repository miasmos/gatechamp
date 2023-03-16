import { PaymentProvider } from "../enum";

const formatCurrency = (
  value: number,
  decimals = 0,
  format: "short" | "long" = "short",
  separator = ","
): string => {
  const str = Math.floor(value).toString();
  const magnitude = str.length / 3;
  let suffix = "";

  if (magnitude > 5) {
    suffix = "Q";
  } else if (magnitude > 4) {
    suffix = "T";
  } else if (magnitude > 3) {
    suffix = "B";
  } else if (magnitude > 2) {
    suffix = "M";
  } else if (magnitude > 1) {
    suffix = "K";
  } else {
    suffix = "";
  }

  if (format === "short" && suffix.length > 0) {
    const integerLength = Math.round((magnitude % 1) * 3) || 3;
    const formattedInteger = str.substring(0, integerLength);
    const formattedDecimals = str.substring(
      integerLength,
      integerLength + decimals
    );
    if (decimals > 0) {
      return `${formattedInteger}.${formattedDecimals}${suffix}`;
    } else {
      return `${formattedInteger}${suffix}`;
    }
  } else {
    let formatted = [];
    for (let i = str.length - 1; i >= 0; i--) {
      formatted.push(str[i]);
      if ((str.length - i) % 3 === 0 && i !== 0) {
        formatted.push(separator);
      }
    }
    return formatted.reverse().join("");
  }
};

const centsToIsk = (cents: number) => cents * 100000;

const savingsPercent = (baseValue: number, comparedValue: number) =>
  Math.round((1 - baseValue / comparedValue) * 100);

const getSymbol = (provider: PaymentProvider) => {
  switch (provider) {
    case PaymentProvider.Ccp:
      return "Ƶ";
    case PaymentProvider.Stripe:
      return "$";
  }
};

export { formatCurrency, centsToIsk, savingsPercent, getSymbol };
