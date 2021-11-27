int float_multiply_array(float factor, float *arr, int length) {
  for (int i = 0; i < length; i++) {
    arr[i] = factor * arr[i];
  }
  return 0;
}