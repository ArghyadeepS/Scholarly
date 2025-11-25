import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, Calendar, FileText, Award } from "lucide-react";
import { MinecraftHeading } from "@/components/MinecraftHeading";
import { LanguageSelector } from "@/components/LanguageSelector";

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [language, setLanguage] = useState("en");

  const tags = [
    { name: "Exam", icon: FileText },
    { name: "Scholarship", icon: Award },
    { name: "Policy", icon: BookOpen },
    { name: "Deadlines", icon: Calendar }
  ];

  const articles = [
    {
      id: "1",
      title: "Understanding National Scholarship Eligibility",
      description: "Complete guide to eligibility criteria for national scholarships",
      tags: ["Scholarship", "Policy"],
      readTime: "5 min"
    },
    {
      id: "2",
      title: "Exam Registration Process Step-by-Step",
      description: "Detailed walkthrough of the exam registration procedure",
      tags: ["Exam"],
      readTime: "8 min"
    },
    {
      id: "3",
      title: "Important Academic Deadlines 2024-2025",
      description: "Key dates for applications, exams, and admissions",
      tags: ["Deadlines"],
      readTime: "3 min"
    },
    {
      id: "4",
      title: "College Admission Requirements",
      description: "Documents and qualifications needed for college admission",
      tags: ["Policy"],
      readTime: "7 min"
    }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || article.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  if (selectedArticle) {
    const article = articles.find(a => a.id === selectedArticle);
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setSelectedArticle(null)}>
            Back to Articles
          </Button>
          <LanguageSelector value={language} onChange={setLanguage} />
        </div>

        <Card className="pixel-border">
          <CardHeader>
            <div className="flex gap-2 mb-4">
              {article?.tags.map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
            <MinecraftHeading className="text-2xl mb-4">
              {article?.title}
            </MinecraftHeading>
            <CardDescription className="text-base">
              {article?.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="prose prose-slate dark:prose-invert max-w-none">
            <p>
              This is a detailed article about {article?.title.toLowerCase()}. 
              In production, this would contain comprehensive information with proper formatting.
            </p>
            <h3>Overview</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua.
            </p>
            <h3>Key Points</h3>
            <ul>
              <li>Important requirement #1</li>
              <li>Important requirement #2</li>
              <li>Important requirement #3</li>
            </ul>
            <Button className="mt-6">
              Explain in {language.toUpperCase()}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <MinecraftHeading className="text-2xl md:text-3xl mb-2">
          Knowledge Base
        </MinecraftHeading>
        <p className="text-muted-foreground">
          Search articles and guides on academic procedures
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="pixel-border">
        <CardContent className="pt-6">
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedTag === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTag(null)}
            >
              All
            </Button>
            {tags.map(tag => (
              <Button
                key={tag.name}
                variant={selectedTag === tag.name ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTag(tag.name)}
              >
                <tag.icon className="h-4 w-4 mr-2" />
                {tag.name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredArticles.map(article => (
          <Card 
            key={article.id} 
            className="pixel-border hover:shadow-lg transition-all cursor-pointer group"
            onClick={() => setSelectedArticle(article.id)}
          >
            <CardHeader>
              <div className="flex gap-2 mb-2">
                {article.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
              <CardTitle className="group-hover:text-primary transition-colors">
                {article.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{article.description}</CardDescription>
              <div className="flex items-center text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4 mr-2" />
                {article.readTime} read
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredArticles.length === 0 && (
        <Card className="pixel-border">
          <CardContent className="py-12 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No articles found matching your search</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default KnowledgeBase;
