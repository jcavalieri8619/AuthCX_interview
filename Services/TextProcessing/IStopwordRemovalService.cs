namespace AuthCX.TextProcessing
{
    public interface IStopwordRemovalService
    {
        string RemoveStopwords(string input);
    }
}