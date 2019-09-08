# React unit testing

## What we will cover

I am really struggling with jest enzyme(best practices) , specially when I need to test redux components and sagas, can you please make a series on this?

## Notes

When we are testing frontend components there are a few things I believe to be true.

Most of the code you write for a UI is tied in to a experience for a user and since this is the case our
focus should be on asserting that the experience is the correct one.

Doing this is however expensive in terms of execution time so the ideal ratio is that we have as few tests that cover
the desired user journey as possible.

These are the most valuable test we have as they assert that a feature is working the correct way when a user
is interacting with our application.

Since these tests are expensive in execution time we want to write tests to cover the behavior of our components
as well so that the interaction tests only need to cover the user experience while the logic itself can be tested
much quicker.

What this gives us is confidence that our component works in isolation and when used as part of a user journey
still behaves correctly when working together with other parts of the application.
