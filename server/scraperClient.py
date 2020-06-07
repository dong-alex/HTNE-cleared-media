# importing libraries
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from nltk.tokenize import word_tokenize, sent_tokenize
import bs4 as BeautifulSoup
import urllib.request

# https://blog.floydhub.com/gentle-introduction-to-text-summarization-in-machine-learning/


class ScraperClient(object):
    def createDictionaryTable(self, text_string) -> dict:

        # removing stop words
        stop_words = set(stopwords.words("english"))

        words = word_tokenize(text_string)

        # reducing words to their root form
        stem = PorterStemmer()
        # creating dictionary for the word frequency table
        frequency_table = dict()
        for wd in words:
            wd = stem.stem(wd)
            if wd in stop_words:
                continue
            if wd in frequency_table:
                frequency_table[wd] += 1
            else:
                frequency_table[wd] = 1

        return frequency_table

    def calculateSentenceScores(self, sentences, frequency_table) -> dict:

        # algorithm for scoring a sentence by its words
        sentence_weight = dict()

        for sentence in sentences:
            sentence_wordcount_without_stop_words = 0
            for word_weight in frequency_table:
                if word_weight in sentence.lower():
                    sentence_wordcount_without_stop_words += 1
                    if sentence[:7] in sentence_weight:
                        sentence_weight[sentence[:7]] += frequency_table[word_weight]
                    else:
                        sentence_weight[sentence[:7]] = frequency_table[word_weight]

            sentence_weight[sentence[:7]] = (
                sentence_weight[sentence[:7]] / sentence_wordcount_without_stop_words
            )

        return sentence_weight

    def calculateAverageScore(self, sentence_weight) -> int:

        # calculating the average score for the sentences
        sum_values = 0
        for entry in sentence_weight:
            sum_values += sentence_weight[entry]

        # getting sentence average value from source text
        average_score = sum_values / len(sentence_weight)

        return average_score

    def getArticleSummary(self, sentences, sentence_weight, threshold):
        sentence_counter = 0
        article_summary = ""

        for sentence in sentences:
            if sentence[:7] in sentence_weight and sentence_weight[sentence[:7]] >= (
                threshold
            ):
                article_summary += " " + sentence
                sentence_counter += 1

        return article_summary

    def runArticleSummary(self, article):
        # grab the webpage html
        # fetching the content from the URL
        fetched_data = urllib.request.urlopen(article)

        article_read = fetched_data.read()

        # parsing the URL content and storing in a variable
        article_parsed = BeautifulSoup.BeautifulSoup(article_read, "html.parser")

        article_content = ""

        if "cnn.com" in article:
            paragraphs = article_parsed.find_all("div", "zn-body__paragraph")
        elif "foxnews.com" in article:
            pageContent = article_parsed.find("div", "article-content")
            paragraphs = pageContent.find_all("p")
        else:
            return ""

        print("Obtained the paragraphs")
        # looping through the paragraphs and adding them to the variable
        for p in paragraphs:
            article_content += p.text

        print(article_content)
        # creating a dictionary for the word frequency table
        frequency_table = self.createDictionaryTable(article_content)
        # tokenizing the sentences
        sentences = sent_tokenize(article_content)
        # algorithm for scoring a sentence by its words
        sentence_scores = self.calculateSentenceScores(sentences, frequency_table)
        # getting the threshold
        threshold = self.calculateAverageScore(sentence_scores)
        # producing the summary
        print("Getting summary")
        article_summary = self.getArticleSummary(
            sentences, sentence_scores, 1.1 * threshold
        )
        print(article_summary)
        return article_summary


# client = ScraperClient()
# paragraph = client.runArticleSummary(
#     "https://www.cnn.com/us/live-news/george-floyd-protests-06-07-20/index.html"
# )
# print(paragraph)
