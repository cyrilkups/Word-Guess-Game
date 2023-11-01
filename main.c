#include <stdio.h>
#include <stdlib.h>

int point=0;
int main()
{
    char title[] = "Welcome to Word Guessing Game";
    int length = strlen(title);
    int i;

    printf("\n");

    for (i = 0; i < length + 4; i++) {
        printf("*");
    }
    printf("\n");

    printf("*  %s  *\n", title);

    for (i = 0; i < length + 4; i++) {
        printf("*");
    }
    printf("\n\n");
    int x;

     repeat :
         ////////////////////////////////////////////////
    printf("\n1.Play \n2.Help \n3.Quit \n \n");
    scanf(" %d",&x);
     switch(x)
     {
     case 1:
         Game1();
        break;
     case 2:
    printf("1.The answers should be typed only in small letters\n2.Five points will deducted for a wrong answer but 10 for a correct answer\n\n");
    printf("level 2:gravity,noon,mirror,coffin \n level 3:fire,clock,silence,river,ton \n \n");

    new:
    printf("Press 5 to enter main menu \n\n");
    int t;
    scanf("%d",&t);
    switch (t)
    {
    case 5:
        goto repeat;
        break;
    default:
        goto new;
    }
        break;
     case 3:
        exit(0);
        break;
     default:
        goto repeat;
     }

    return 0;
}


    int Game1()
{
    int guess=1;
    char*arr[] = {
    "mineral",
    "igneous",
    "sediment",
    "fossil"
    };

    char*clues[]={
    "sediment",
    "rocks",
    "fossil",
    "cayons",
    "mineral",
    "igneous"
    };

    int n = 4;

    srand(time(0)); // seed the random number generator with the current time

    int random_index = rand() % n; // generate a random index between 0 and n-1
     printf(" \t \t Welcome to level 1\n \n");
    printf("In this level a list of likely answers will be given\n \n");
    printf("Guess the right word \n \n");
    for(int i=0;i<=6;i++)
    {
        printf("%s \t",clues[i]);
    }
    printf("\n \n");

    while(guess<=2 )
    {
         switch(random_index)
            {
            case 0:
                printf("A naturally occurring inorganic solid with a definite chemical composition. \n What am I? \n");
                break;
            case 1:
                printf("Rocks formed from the solidification of molten material \n What am I? \n");
                break;
            case 2:
                printf("Small particles that settle at the bottom of bodies of water.\n What am I? \n");
                break;
            case 3:
                printf("The preserved remains of ancient organisms in rock layers\n What am I? \n ");
                break;
            }
         char *choise[20];
         scanf("%s",&choise);
            if (strcmp(choise,arr[random_index])==0)
            {
                point+=10;
             printf("congratulations you made it %c\n \n",2);
             printf("your current points is %d \n \n",point);
             Game2();
                break;
            }
            else
            {
                if (guess==2)
                {
                printf("You scored %d points \n",point);
                printf("Game Over  \n \n");
                start:
             printf("Do you wish to play again \n1.Yes\n2.No \n");
             int c;
             scanf(" %d",&c);
             switch(c)
             {
             case 1:
                Game1();
                break;
             case 2:
                exit(0);
                break;
             default:
                 goto start;
                break;
                }
                }
                else
                {
                printf("You  have guessed %d/2 times \nplease try again %c \n \n",guess,1);
                point-=0;
                guess++;
                }

            }
    }
    return 0;
}

int Game2()
{
    int guess=1;
    char*arr[] = {"gravity","noon","mirror","coffin"};// character arrays containing the answers
    int n = 4;

    srand(time(0)); // seed the random number generator with the current time

    int random_index = rand() % n; // generate a random index between 0 and n-1
    printf(" \t \t Welcome to level 2 \n \n");
    printf("In this level the last and first letters of the word will be given \n \n");
    printf("Guess the right word \n \n");
    while(guess<=2 )
    {
         switch(random_index)
            {
            case 0:
                printf("I am a force that pulls objects towards each other. What am I \n");
                printf("Hint: g...t \n");
                break;
            case 1:
                printf("What 4-letter word can be written forward, backward or upside down\nand can still be read from left to right?\n");
                printf("Hint:n...n \n");
                break;
            case 2:
                printf("If you drop me I�m sure to crack, but give me a smile and I�ll always smile back.\nWhat am I?\n");
                printf("Hint: m...r \n");
                break;
            case 3:
                printf("The person who makes it has no need of it; the person who buys it has no use for it.\nThe person who uses it can neither see nor feel it.\nWhat is it? \n ");
                printf("Hint:c...n \n");
                break;

            }
         char *choise[20];
         scanf("%s",&choise);//receives the input answer
            if (strcmp(choise,arr[random_index])==0)//input answers is compared to the answers in the array
            {
                point+=5;
             printf("congratulations you made it %c\n \n",2);
             printf("your current points is %d \n \n",point);
             Game3();
                break;
            }
            else
            {
                if (guess==2)
                {
                printf("You scored %d points \n",point);
                printf("Game Over  \n \n");
                start:
             printf("Do you wish to play again \n1.Yes\n2.No \n");
             int c;
             scanf(" %d",&c);
             switch(c)
             {
             case 1:
                Game1();
                break;
             case 2:
                exit(0);
                break;
             default:
                 goto start;
                break;
                }
                }
                else
                {
                printf(" You have guessed %d/2 times \nplease try again %c \n \n",guess,1);
                point-=1;
                guess++;
                }

            }
            return 0;
    }
}
int Game3()
{
    int guess=1;
    char*arr[] = {"fire","clock","silence","river","ton"};//array containing the answers
    int n = 5;

    srand(time(0)); // seed the random number generator with the current time

    int random_index = rand() % n; // generate a random index between 0 and n-1 the random number is stored in random_index
      printf(" \t \t Welcome to level 3\n \n");
    printf("In this level only clues will be given \n");
    printf("Guess the right word \n \n");

    while(guess<=2 )
    {
         switch(random_index)//the switch uses the random index to pick clues that correspond to the answers
            {
            case 0:
                printf("if i drink i die,if i eat i am fine. What am i ? \n");
                break;
            case 1:
                printf("What has a face, two hands, but no legs or arms ?\n");
                break;
            case 2:
                printf("I'm so Fragile that if you say my name loud enough you will break me \n What am i\n");
                break;
            case 3:
                printf("What runs, but never walks\nMurmurs,but never talks.\nHas a bed ,but never sleeps \nAnd has a mouth,but never eats? \n ");
                break;
            case 4:
                printf("Fowards i am heavy but backwards i am not. What am i ?\n");

            }
         char *choise[20];
         scanf("%s",&choise);//receives input from the user and stores in in choises
            if (strcmp(choise,arr[random_index])==0)//the input given by the user is compared to the answers that correspond to the random index
            {
                point+=5;
             printf("congratulations you have made it to the end of the game %c\n \n",2);
             printf("your current points is %d \n \n",point);
             start:
             printf("Do you wish to play again \n1.Yes\n2.No \n");
             int c;
             scanf(" %d",&c);
             switch(c)
             {
             case 1:
                Game1();
                break;
             case 2:
                exit(0);
                break;
             default:
                 goto start;
             }
                break;
            }
            else
            {
                if (guess==2)
                {
                printf("You scored %d points \n",point);
                printf("Game Over  \n \n");
                break;
                }
                else
                {
                printf("You have guessed %d/2 times \nplease try again %c \n \n",1);
                point-=1;
                guess++;
                }

            }
    }
    return 0;
}





