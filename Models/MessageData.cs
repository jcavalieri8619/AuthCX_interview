namespace AuthCX.Models
{
    public class MessageData : IMessage
    {
        public string Id { get; set; }
        public string Text { get; set; }
        public string NoStopText { get; set; }

        public override string ToString()
        {
            return $"{nameof(Id)}: {Id}, {nameof(Text)}: {Text}, {nameof(NoStopText)}: {NoStopText}";
        }
    }
}