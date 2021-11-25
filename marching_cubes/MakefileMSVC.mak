# Project: libMC33
NAME     = MC33
!IFNDEF TARGETP
TARGETP  = x64
!ENDIF
LIBDIR   = lib\$(TARGETP)
SRC      = source\libMC33.c
OBJ      = libMC33.obj
BIN      = $(LIBDIR)\$(NAME).lib
# delete the /TP option to compile as C source file
CFLAGS   = /TP /GL /W3 /Gy /I".\include" /O2 /Zc:inline /fp:fast /Gd /Oi /MD /EHsc /nologo /Ot /D _CRT_SECURE_NO_WARNINGS
LIBFLAGS = /LTCG /MACHINE:$(TARGETP) /NOLOGO
 
all: $(BIN)

$(OBJ): $(SRC)
	$(CC) $(CFLAGS) /c $(SRC)

$(BIN): $(OBJ)
	@if not exist $(LIBDIR) mkdir $(LIBDIR)
	LIB /OUT:$(BIN) $(LIBFLAGS) $(OBJ)

clean:
	-1 del $(OBJ)
	-1 del $(BIN)
