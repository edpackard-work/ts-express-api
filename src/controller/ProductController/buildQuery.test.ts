import { isQueryParamValidNumber, searchQuery, categoryQuery } from './buildQuery';
import randomWord from 'random-words';
import { Request } from 'express';

describe('isQueryParamValidNumber', () => {
   it.each`
argument          | result 
  -------------------------------------
${5} | ${true}
${"hi"} | ${false}     
${-1} | ${false}     
${10001} | ${false}  
${true} | ${false}  
${null} | ${false}  
${{}} | ${false}  
${undefined} | ${false}  
${Infinity} | ${false}  
`(
            'given $argument, returns $result',
            ({ argument, result }) => {
            
            expect(isQueryParamValidNumber(argument)).toEqual(result);
            },
        );

})

describe('searchQuery', () => {
    it('searches query', () => {
        const search = randomWord();
        const request = { query: { search } } as unknown as Request;
        const result = searchQuery(request);

        expect(result.some((e) => e.fuzzy?.name?.value == search)).toBe(true);
        expect(result.some((e) => e.fuzzy?.description == search)).toBe(true);
        expect(result.some((e) => e.fuzzy?.['category.name'] == search)).toBe(true);
    })
})

describe('categoryQuery', () => {
    it('categories the query', () => {
        const search = randomWord();
        const request = { query: { category: search } } as unknown as Request;
        const result = categoryQuery(request);

        expect(result).toEqual({
            bool: {
                should: [
                    { match: { 'categories.name': search } },
                ]
            }
        })
    })

    it('categories the query', () => {
        const category = randomWord(3);
        const request = { query: { category } } as unknown as Request;
        const result = categoryQuery(request);

        expect(result).toEqual({
            bool: {
                should: [
                    { match: { 'categories.name': category[0] } },
                    { match: { 'categories.name': category[1] } },
                    { match: { 'categories.name': category[2] } },
                ]
            }
        })
    })
})   
