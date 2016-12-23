#include <stdio.h>
#include <string.h>

//It's Really Good to use computer for repeated work!
//Author: JaeHoon Moon
//Wrote for generating audio tag and array

int main(void)
{
	FILE *f = fopen("file.txt", "w");
	int i,j,k;
	int number;
	if (f == NULL)
	{
    	printf("Error opening file!\n");
	}
	const char* mel[8] = {"do", "re", "mi", "fa", "so", "la", "si", "doh"};
	const char* aiueo[5] = {"A", "I", "U", "E", "O"};
	char* conso[10] = {"", "K", "S", "T", "N", "H", "M", "Y", "R", "W"};
	for (k = 0; k < 8; k++)
	{
		for (i = 0; i < 10; i++)
		{
			for(j = 0; j<5;j++)
			{
				number = (k+1)*100 + i*5 + j;
				fprintf(f, "%d : '%s%s%s', ", number, conso[i], aiueo[j], mel[k]);	
			}
		}
		fprintf(f, "\n");
	}	
	
	for (k = 0; k < 8; k++)
	{
		for (i = 0; i < 10; i++)
		{
			for(j = 0; j<5;j++)
			{
				fprintf(f, "<audio id=%s%s%s> <source src=vocal/%s%s%s.wav></audio> ", conso[i], aiueo[j], mel[k],conso[i], aiueo[j], mel[k]);	
			}
			fprintf(f, "\n");

		}
	}
	
fclose(f);
}