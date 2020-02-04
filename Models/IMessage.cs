namespace AuthCX.Models
{
    public interface IMessage
    {
        string Id { get; set; }
        string Text { get; set; }
        string NoStopText { get; set; }
    }
}