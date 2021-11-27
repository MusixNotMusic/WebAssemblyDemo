#include<stdio.h>

double* displayArray(double* doubleVector) {
    for (int cnt = 0; cnt < 3; cnt++) {
        printf("before doubleVector[%d] = %f\n", cnt, doubleVector[cnt]);
    }
    doubleVector[0] = 98;
    doubleVector[1] = 99;
    doubleVector[2] = 100;

    for (int cnt1 = 0; cnt1 < 3; cnt1++) {
        printf("after doubleVector[%d] = %f\n", cnt1, doubleVector[cnt1]);
    }
    return doubleVector;
}

int main() {

	double d1, d2, d3;
	double array1[3];
	double *array2;
	
	
	array1[0] = 1.00000;
	array1[1] = 2.000000;
	array1[2] = 3.000000;
	
	array2 = displayArray(array1);
	
	for (int cntr =0; cntr < 3; cntr++)
		printf("array1[%d] = %f\n", cntr, array1[cntr]);
		
	for (int cnt = 0; cnt < 3; cnt++)
		printf("array2[%d] = %f\n", cnt, array2[cnt]);
		
    return 1;
}

// emcc cwrap.c -o cwrap.html -s EXPORTED_FUNCTIONS='["_main", "_displayArray"]' -s EXPORTED_RUNTIME_METHODS='["ccall","cwrap"]'
