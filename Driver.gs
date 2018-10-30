function driver(input) {
  switch (input) {
    case 'ignored':
      return ['Summary', 'MASTER', 'List'];
      break;
    default:
      throw '"' + input + '" was not found in driver function.';
  }
}
