
import React, { useState, useEffect } from "react";
import QAItem from "../Entities/QAItem.json";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../Components/ui/accordion";
import { Card, CardContent } from "../Components/ui/card";
import { Button } from "../Components/ui/button";
import { Input } from "../Components/ui/input";
import { Badge } from "../Components/ui/badge"; // Added this import
import { HelpCircle, ThumbsUp, Search } from "lucide-react";
import { Skeleton } from "../Components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "../Components/ui/tabs";
import { debounce } from 'lodash';
const CATEGORIES = ["all", "menstrual_cycle", "ovulation", "birth_control", "symptoms", "lifestyle"];

export default function QAHubPage() {
  const [qaItems, setQaItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadQAItems();
  }, []);

  useEffect(() => {
    let items = qaItems;

    if (activeCategory !== "all") {
      items = items.filter(item => item.category === activeCategory);
    }
    
    if (searchTerm) {
      items = items.filter(item => 
        item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredItems(items);
  }, [qaItems, activeCategory, searchTerm]);

  const loadQAItems = async () => {
    setIsLoading(true);
    try {
      const data = await QAItem.list('-helpful_count');
      setQaItems(data);
      setFilteredItems(data);
    } catch (error) {
      console.error("Error loading Q&A items:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleHelpfulClick = async (item) => {
    const newCount = (item.helpful_count || 0) + 1;
    await QAItem.update(item.id, { helpful_count: newCount });
    // Optimistically update UI
    setQaItems(prevItems => prevItems.map(i => i.id === item.id ? {...i, helpful_count: newCount} : i));
  };
  
  const debouncedSearch = debounce((value) => setSearchTerm(value), 300);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
          Q&A Knowledge Hub
        </h1>
        <p className="text-gray-600 text-lg">
          Find answers to your questions about menstrual and reproductive health.
        </p>
      </div>
      
      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input 
            placeholder="Search questions..." 
            className="pl-10 border-cyan-200 focus:border-cyan-400"
            onChange={(e) => debouncedSearch(e.target.value)}
          />
        </div>
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="grid w-full grid-cols-3 md:grid-cols-6 bg-cyan-100/50">
            {CATEGORIES.map(cat => (
              <TabsTrigger key={cat} value={cat} className="capitalize data-[state=active]:bg-cyan-500 data-[state=active]:text-white">
                {cat.replace(/_/g, ' ')}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Q&A Accordion */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          {isLoading ? (
            <div className="space-y-4">
              {Array(5).fill(0).map((_, i) => <Skeleton key={i} className="h-14 bg-gray-100 rounded-lg" />)}
            </div>
          ) : filteredItems.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {filteredItems.map(item => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger className="text-left font-semibold text-gray-800 hover:no-underline hover:text-cyan-700">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="pt-2">
                    <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">{item.answer}</p>
                    <div className="flex items-center justify-end gap-4 mt-4">
                      <Badge variant="outline" className="border-cyan-200 text-cyan-700 font-medium capitalize">
                        {item.category.replace(/_/g, ' ')}
                      </Badge>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-cyan-600" onClick={() => handleHelpfulClick(item)}>
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        Helpful ({item.helpful_count || 0})
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-20">
              <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700">No questions found.</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or filter.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
