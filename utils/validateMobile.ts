/*
========================================
NORMALIZE MOBILE
========================================
*/

function normalizeMobile(
  mobile: string
) {

  return mobile

    .replace(/\s+/g, "")

    .replace("+91", "")

    .trim();
}

/*
========================================
REPEATED DIGITS
========================================
*/

function isRepeatedDigits(
  mobile: string
) {

  return /^(\d)\1{9}$/.test(
    mobile
  );
}

/*
========================================
SEQUENTIAL PATTERNS
========================================
*/

function isSequential(
  mobile: string
) {

  const sequences = [

    "0123456789",

    "1234567890",

    "0987654321",

    "9876543210",

  ];

  return sequences.includes(
    mobile
  );
}

/*
========================================
ALTERNATING PATTERNS
========================================
*/

function isAlternatingPattern(
  mobile: string
) {

  return /^(\d{2})\1{4}$/.test(
    mobile
  );
}

/*
========================================
VALID INDIAN PREFIX
========================================
*/

function hasValidIndianPrefix(
  mobile: string
) {

  return /^[6-9]/.test(
    mobile
  );
}

/*
========================================
MAIN VALIDATOR
========================================
*/

export function validateMobile(
  input: string
) {

  const mobile =
    normalizeMobile(input);

  /*
  ========================================
  LENGTH
  ========================================
  */

  if (
    !/^\d{10}$/.test(
      mobile
    )
  ) {

    return {

      valid: false,

      reason:
        "Please enter a valid mobile number.",

    };
  }

  /*
  ========================================
  PREFIX
  ========================================
  */

  if (
    !hasValidIndianPrefix(
      mobile
    )
  ) {

    return {

      valid: false,

      reason:
        "Please enter a valid mobile number.",

    };
  }

  /*
  ========================================
  REPEATED DIGITS
  ========================================
  */

  if (
    isRepeatedDigits(
      mobile
    )
  ) {

    return {

      valid: false,

      reason:
        "Please enter a valid mobile number.",

    };
  }

  /*
  ========================================
  SEQUENTIAL
  ========================================
  */

  if (
    isSequential(
      mobile
    )
  ) {

    return {

      valid: false,

      reason:
        "Please enter a valid mobile number.",

    };
  }

  /*
  ========================================
  ALTERNATING
  ========================================
  */

  if (
    isAlternatingPattern(
      mobile
    )
  ) {

    return {

      valid: false,

      reason:
        "Please enter a valid mobile number.",

    };
  }

  /*
  ========================================
  SUCCESS
  ========================================
  */

  return {

    valid: true,

    normalizedMobile:
      mobile,

  };
}