### Feel free to use the MC33 C library.

---

#### INFO:

MC33 library version 5.0

This library is a new version of the MC33 library of the paper:
Vega, D., Abache, J., Coll, D., [A Fast and Memory-Saving Marching Cubes 33 implementation with the correct interior test](http://jcgt.org/published/0008/03/01), *Journal of Computer Graphics Techniques (JCGT)*, vol. 8, no. 3, 1-18, 2019.

The MC33 library is an open source software. The distribution and use rights are under the terms of the [MIT license](https://opensource.org/licenses/MIT), described in the file "LICENSE.txt".

---

#### FILES:

Makefile (Linux or MinGW/msys GCC makefile)
MakefileMSVC.mak (MSVC nmake makefile)
compileMSVC.bat (batch script to compile with MSVC)
include/marching_cubes_33.h (header file)
source/marching_cubes_33.c (contains the code)
source/MC33_LookUpTable.h (Triangulation pattern for each MC33 case)
source/MC33_util_grd.c (contains additional code to read and manage grid files)
source/libMC33.c (library source file)
example/TestMC33.cpp (Example of use. FLTK library is required)
example/makefileMinGW-w64.mak (MinGW/msys GCC makefile)
example/makefiledebian.mak (Debian GCC makefile)
GLUT_example/TestMC33_glut.cpp (Example of use. GLUT or FREEGLUT library is required)
GLUT_example/makefileMinGW-w64.mak (MinGW/msys GCC makefile)
GLUT_example/makefiledebian.mak (Debian GCC makefile)

---

#### CUSTOMIZING:

There are 3 options that can be modified before compiling the library. You can do it by editing the marching_cubes_33.h or libMC33.c file:

1. To change the data type of the grid (the default value is float) define size_type_GRD and/or integer_GRD (marching_cubes_33.h). For example:
	```c
	#define size_type_GRD 8 // the data type is double

	#define integer_GRD
	#define size_type_GRD 4 // the data type is unsigned int

	#define integer_GRD
	#define size_type_GRD 2 // the data type is unsigned short int

	#define integer_GRD
	#define size_type_GRD 1 // the data type is unsigned char
	```

2. If you do not use inclined grids, you can define GRD_orthogonal (marching_cubes_33.h):
	```c
	#define GRD_orthogonal
	```

3. If you need to exchange the front and back surfaces, define MC_Normal_neg (libMC33.c):
	```c
	#define MC_Normal_neg
	```

---

#### INSTALLING:

1. Compile the libMC33.cpp file as a static C/C++ library:
	- A GCC makefile is supplied with the library. In a Linux terminal or in msys2 mingw console go to the folder where the Makefile file is, and type: make
	- If you are using Visual Studio, run the batch script compileMSVC.bat to compile for x64 target platform. If you want to compile for win32 platform, open a cmd or powershell window in the folder where compileMSVC.bat exists and type: .\compileMSVC x86

	Once the library is compiled copy the libMC33.a (or MC33.lib) from the local lib directory to the compiler lib directory. Also copy the marching_cubes_33.h file from the local include directory to the compiler include directory.

	Include the header file in your C/C++ code:
	```c
	#include <marching_cubes_33.h>
	```
	and put in the linker options of your program makefile: -lMC33


2. Instead of compiling the library, you can directly include the library code files in your code. Put at the beginning of your C/C++ code:
	```c
	#include "..Path ../source/marching_cubes_33.c"
	```

	To use the functions that read some grid files, also include the MC33_util_grd.c file (marching_cubes_33.h file has to be included before).

---

#### COMPILING THE EXAMPLE:

In Debian terminal window, go to the FLTK_example or GLUT_example folder and write:
```sh
make -f makefiledebian.mak
```

Or in a msys2 MinGW64 Shell (Windows), write:
```sh
make -f makefileMinGW-w64.mak
```

For the FLTK example in any operating system you also can use the fltk-config script:
```sh
path/fltk-1.X.Y/fltk-config --compile TestMC33.cpp
```

The makefiles use the -Ofast optimization option and the fltk-config script uses a lower optimization level.

The GLUT example has less functionality than the FLTK example. The file containing the grid must be passed to the program on the command line and no other grid file can be read from the running program. Using the Windows file explorer, the grid file can be dragged and dropped onto the GLUT example executable.

---

#### USAGE:

You can declare a `_GRD` pointer and then use one of the functions to load files that contain grids (read_grd, read_scanfiles, read_raw_file or read_dat_file, found in the MC33_util_grd.c file):
```c
	_GRD* G;
	G = read_dat_file("filename.dat");
```

Or create a `_GRD` from your own grid data, for example:
```c
	unsigned int nx, ny, nz, i, j, k, l;
	double r0[3] = {-4, -4, -4}, d[3] = {0.04, 0.04, 0.04};
	nx = ny = nz = 201;
	float *data = (float*)malloc(nx*ny*nz*sizeof(float));
	l = 0;
	for (k = 0; k < nz; ++k)
	{
		float z = r0[2] + k*d[2];
		for (j = 0; j < ny; ++j)
		{
			float y = r0[1] + j*d[1];
			for (i = 0; i < nx; ++i)
			{
				float x = r0[0] + i*d[0];
				data[++l] = cos(x) + cos(y) + cos(z);
			}
		}
	}
	_GRD *G = grid_from_data_pointer(nx, ny, nz, data);
	memcpy(G->r0, r0, sizeof r0);
	memcpy(G->d, d, sizeof d);
```

see the file marching_cubes_33.h for the description of the `_GRD` structure.

Now, you need create a MC33 structure using the create_MC33 function:
```c
	MC33 *M;
	M = create_MC33(G);
```

To calculate the isosurface with the MC33 algorithm:
```c
	surface* S;
	S = calculate_isosurface(M, isovalue);
```

To free the memory occupied by S:
```c
	free_surface_memory(S);
```

To free the memory occupied by M:
```c
	free_MC33(M);
```


See marching_cubes_33.h and MC33_util_grd.c for the use of other functions.

---

#### OTHERS:

To display the surface with OpenGL:
```c
	glEnableClientState(GL_VERTEX_ARRAY);
	glEnableClientState(GL_NORMAL_ARRAY);
	glEnableClientState(GL_COLOR_ARRAY);

	glVertexPointer(3, GL_FLOAT, 0, &S->V[0]);
	glNormalPointer(GL_FLOAT, 0, &S->N[0]);
	glColorPointer(4, GL_UNSIGNED_BYTE, 0, &S->color[0]);

	glDrawElements(GL_TRIANGLES, 3*S->nT, GL_UNSIGNED_INT, &S->T[0]);
	
	glDisableClientState(GL_COLOR_ARRAY);
	glDisableClientState(GL_NORMAL_ARRAY);
	glDisableClientState(GL_VERTEX_ARRAY);
```

or:
```c
	unsigned int i = 3*S->nT + 1;
	unsigned int *t = S->T[0] - 1;
	glBegin(GL_TRIANGLES);
		while (--i) {
			glNormal3fv(S->N[*(++t)]);
			glColor4ubv((unsigned char *)&(S->color[*t]));
			glVertex3fv(S->V[*t]);
		}
	glEnd();
```

To calculate the size (in bytes) of an isosurface, without calculating the isosurface, use:
```c
	unsigned long long size = size_of_isosurface(M, iso, nV, nT);
```
where M is a pointer to the MC33 structure, iso is the isovalue (a "`float`"), nV and nT are unsigned integers that will contain the number of vertices and triangles, respectively. 

See [this link](https://stackoverflow.com/questions/65066235/estimating-size-of-marching-cubes-output-geometry)

---

See [MC33_libraries](https://facyt-quimicomp.neocities.org/MC33_libraries.html) web page
mail to: <dvega@uc.edu.ve>
