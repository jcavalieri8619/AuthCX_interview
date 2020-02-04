using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using AuthCX.Models;
using CsvHelper;
using CsvHelper.Configuration;
using Microsoft.Extensions.Logging;

namespace AuthCX.Repositories.User
{
    public class UserRepo : IUserRepo
    {
        private readonly ILogger<UserRepo> _logger;
        private readonly IEnumerable<UserInfo> _userInfoRecords;

        public UserRepo(ILogger<UserRepo> logger)
        {
            _logger = logger;
            using var reader =
                new StreamReader(Path.Combine(Directory.GetCurrentDirectory(), "SampleData", "userInfoBatch.csv"));
            using var csvReader = new CsvReader(reader, CultureInfo.InvariantCulture);
            csvReader.Configuration.HasHeaderRecord = true;
            csvReader.Configuration.Delimiter = ",";

            csvReader.Configuration.IgnoreBlankLines = true;

            csvReader.Configuration.TrimOptions = TrimOptions.Trim;

            _userInfoRecords = csvReader.GetRecords<UserInfo>().ToList();

           
        }

        public IEnumerable<UserInfo> GetUserRecords()
        {
            return _userInfoRecords;
        }
    }
}